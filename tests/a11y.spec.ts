import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility checks — the site practises what it preaches.
 * Every key page must pass axe with no WCAG 2 A/AA violations.
 */
const pages = {
  home: '/',
  'project detail': '/projects/ai-augmented-e2e/',
  'live demo': '/demo',
};

for (const [name, path] of Object.entries(pages)) {
  test(`${name} has no accessibility violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
