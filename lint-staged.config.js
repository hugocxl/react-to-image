module.exports = {
  '{packages,core}/**/*': [
    'pnpm --reporter=silent lint:fix',
    'pnpm --reporter=silent format:fix'
  ],
  '{packages,core}/**/*.css': ['pnpm --reporter=silent styles:fix'],
  '{packages,core}/**/*.{ts,tsx}': "bash -c 'pnpm types:check'"
}
