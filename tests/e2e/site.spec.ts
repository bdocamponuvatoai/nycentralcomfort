import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = [
  '/',
  '/about',
  '/services',
  '/services/ac-installation',
  '/services/heating-cooling',
  '/services/ductwork',
  '/services/maintenance-repair',
  '/services/indoor-air-quality',
  '/services/cooling-towers',
  '/gallery',
  '/contact',
  '/privacy',
  '/terms',
];

for (const path of pages) {
  test(`${path} renders cleanly`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test.describe('accessibility (WCAG 2.2 AA)', () => {
  // Axe runs once per layout (Chromium desktop + Pixel); other engines never open these pages.
  test.skip(({ browserName }) => browserName !== 'chromium');
  for (const path of pages) {
    test(`${path} has no axe violations`, async ({ page }) => {
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(violations.map((v) => `${v.id}: ${v.nodes[0]?.target}`)).toEqual([]);
    });
  }
});

test('unknown routes return a real 404', async ({ page }) => {
  expect((await page.goto('/no-such-page'))?.status()).toBe(404);
  expect((await page.goto('/services/roofing'))?.status()).toBe(404);
});

test('legacy .html URLs redirect permanently', async ({ request }) => {
  for (const [from, to] of [
    ['/index.html', '/'],
    ['/about.html', '/about'],
    ['/service.html', '/services'],
    ['/contact.html', '/contact'],
    ['/gallery.html', '/gallery'],
  ]) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), from).toBe(308);
    expect(new URL(res.headers()['location']!, 'http://x').pathname).toBe(to);
  }
});

test('SEO essentials are present', async ({ page, request }) => {
  await page.goto('/services/ductwork');
  await expect(page).toHaveTitle(/Ductwork Installation/);
  expect(await page.locator('link[rel=canonical]').getAttribute('href')).toContain('/services/ductwork');
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types = ld.flatMap((t) => {
    const j = JSON.parse(t);
    return j['@graph'] ? j['@graph'].map((g: { '@type': string }) => g['@type']) : [j['@type']];
  });
  expect(types).toEqual(expect.arrayContaining(['HVACBusiness', 'Service', 'BreadcrumbList']));
  for (const file of [
    '/robots.txt',
    '/sitemap.xml',
    '/llms.txt',
    '/opengraph-image',
    '/manifest.webmanifest',
  ]) {
    expect((await request.get(file)).status(), file).toBe(200);
  }
});

test('security headers are sent', async ({ request }) => {
  const h = (await request.get('/')).headers();
  expect(h['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(h['x-frame-options']).toBe('DENY');
  expect(h['x-content-type-options']).toBe('nosniff');
  expect(h['strict-transport-security']).toContain('max-age=');
  expect(h['x-powered-by']).toBeUndefined();
});

test.describe('quote form', () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test('flags invalid fields and moves focus to the first one', async ({ page }) => {
    await page.goto('/contact');
    await page.fill('#name', 'J');
    await page.click('button[type=submit]');
    await expect(page.locator('form [role=alert]')).toContainText('Please check the highlighted fields.');
    await expect(page.locator('#name')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#name')).toBeFocused();
  });

  test('never claims success when email is not configured, and keeps input', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForTimeout(3000); // past the bot time trap
    await page.fill('#name', 'Jordan Rivera');
    await page.fill('#email', 'jordan@example.com');
    await page.fill('#message', 'We need new ductwork for a second-floor office in Brooklyn.');
    await page.click('button[type=submit]');
    await expect(page.locator('form [role=alert]')).toContainText('not connected yet');
    await expect(page.locator('#message')).toHaveValue(/second-floor office/);
  });

  test('works without JavaScript', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('/contact');
    await page.fill('#name', 'J');
    await page.click('button[type=submit]');
    await expect(page.locator('form [role=alert]')).toContainText('Please check the highlighted fields.');
    await ctx.close();
  });
});
