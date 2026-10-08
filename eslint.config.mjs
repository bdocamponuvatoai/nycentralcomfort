import next from 'eslint-config-next';

const config = [...next, { ignores: ['.next/**', 'node_modules/**', '_old-static/**', 'next-env.d.ts'] }];

export default config;
