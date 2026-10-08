// Screenshots + axe WCAG 2.2 AA + overflow check on desktop and phone.
// Usage (server running on :3210): node scripts/audit.mjs <outDir> / /about /services ...
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const [out, ...paths] = process.argv.slice(2);
const browser = await chromium.launch();
for (const [w, h, tag] of [
  [1440, 900, 'd'],
  [390, 844, 'm'],
]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  for (const p of paths) {
    const res = await page.goto('' + (process.env.BASE ?? 'http://localhost:3000') + '' + p, {
      waitUntil: 'networkidle',
    });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const h1 = await page.locator('h1').count();
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const name = p.replace(/\W+/g, '_') || 'home';
    await page.screenshot({ path: `${out}/${tag}${name}.png`, fullPage: true });
    console.log(
      tag,
      p,
      res.status(),
      'h1=' + h1,
      'overflow=' + overflow,
      'axe=' +
        axe.violations
          .map(
            (v) =>
              `${v.id}(${v.nodes.length}): ${v.nodes[0].target} ${v.nodes[0].failureSummary?.split('\n')[1] ?? ''}`,
          )
          .join(' | '),
    );
  }
  if (errors.length) console.log('console errors:', [...new Set(errors)].slice(0, 5));
  await ctx.close();
}
await browser.close();
