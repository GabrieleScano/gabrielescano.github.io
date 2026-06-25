import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test('loads the hero and three featured projects', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Quality starts',
    );
    await expect(page.locator('#projects article')).toHaveCount(3);
  });

  test('exposes the live-demo link in the nav', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('link', { name: 'Live demo' }).first(),
    ).toBeVisible();
  });
});

test.describe('Project detail pages', () => {
  for (const slug of [
    'ai-augmented-e2e',
    'requirements-analyzer',
    'api-performance-suite',
  ]) {
    test(`renders ${slug}`, async ({ page }) => {
      await page.goto(`/projects/${slug}/`);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(slug);
      await expect(
        page.getByRole('link', { name: 'View repository' }),
      ).toBeVisible();
    });
  }

  test('requirements-analyzer links to the live demo', async ({ page }) => {
    await page.goto('/projects/requirements-analyzer/');
    await expect(
      page.getByRole('link', { name: /Try the live demo/ }),
    ).toBeVisible();
  });
});

test.describe('Live demo', () => {
  test('analyses the flawed example and updates on the clean one', async ({
    page,
  }) => {
    await page.goto('/demo');
    const score = page.locator('#reqcheck-score');

    // The flawed example is server-rendered and analysed on load.
    await expect(score).toHaveText('55');
    await expect(page.locator('#reqcheck-findings li')).toHaveCount(6);

    await page.getByRole('button', { name: 'Clean story' }).click();
    await expect(score).toHaveText('100');
    await expect(page.locator('#reqcheck-findings li')).toHaveCount(0);
  });
});
