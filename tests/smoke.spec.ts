import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test('loads the hero and four featured projects', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      "I'm Gabriele",
    );
    await expect(page.locator('#projects article')).toHaveCount(4);
  });

  test("opens the Let's talk menu with the contact options", async ({ page }) => {
    await page.goto('/');
    const trigger = page.locator('main').getByRole('button', { name: "Let's talk" });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const panel = page.locator(`#${await trigger.getAttribute('aria-controls')}`);
    await expect(panel.getByRole('link', { name: 'Write me an email' })).toHaveAttribute(
      'href',
      'mailto:gabrielescano.bcn@gmail.com',
    );
    await expect(panel.getByRole('button', { name: 'Copy email address' })).toBeVisible();
    await expect(panel.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
    await expect(panel.getByRole('link', { name: 'GitHub' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('copies the email address from the contact menu', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await page.locator('main').getByRole('button', { name: "Let's talk" }).click();
    await page.getByRole('button', { name: 'Copy email address' }).click();
    await expect(page.getByRole('button', { name: 'Copied ✓' })).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      'gabrielescano.bcn@gmail.com',
    );
  });

  test('lists the contact links in the footer of inner pages', async ({ page }) => {
    await page.goto('/projects/ai-augmented-e2e/');
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: 'gabrielescano.bcn@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:gabrielescano.bcn@gmail.com',
    );
    await expect(footer.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
    await expect(footer.getByRole('link', { name: 'GitHub' })).toBeVisible();
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
    'test-triage-kit',
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

test.describe('Dark mode', () => {
  test('toggles the theme and persists across reloads', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const initial = await html.getAttribute('data-theme');

    await page.getByRole('button', { name: 'Toggle dark mode' }).click();
    const toggled = await html.getAttribute('data-theme');
    expect(toggled).not.toBe(initial);

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', toggled!);
  });
});

test.describe('Load chart', () => {
  test('renders and reveals a tooltip on hover', async ({ page }) => {
    await page.goto('/projects/api-performance-suite/');
    await expect(page.locator('#k6-chart svg')).toBeVisible();

    const tip = page.locator('#k6-tip');
    await expect(tip).toBeHidden();
    await page.locator('#k6-capture').hover({ position: { x: 220, y: 90 } });
    await expect(tip).toBeVisible();
    await expect(tip).toContainText('VUs');
  });
});

test.describe('Live demo', () => {
  test('ships the initial analysis in the HTML (no JavaScript needed)', async ({ browser }) => {
    // Rendering it client-side made the results pop in late and hurt
    // Lighthouse's Speed Index on slower CI machines.
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/demo');
    await expect(page.locator('#reqcheck-score')).toHaveText('65');
    await expect(page.locator('#reqcheck-findings li')).toHaveCount(7);
    await context.close();
  });

  test('analyses the flawed example and updates on the clean one', async ({
    page,
  }) => {
    await page.goto('/demo');
    const score = page.locator('#reqcheck-score');

    // The flawed example is server-rendered and analysed on load.
    await expect(score).toHaveText('65');
    await expect(page.locator('#reqcheck-findings li')).toHaveCount(7);

    await page.getByRole('button', { name: 'Clean story' }).click();
    await expect(score).toHaveText('100');
    await expect(page.locator('#reqcheck-findings li')).toHaveCount(0);
  });

  test('shows no score for empty input and caps a story without criteria', async ({
    page,
  }) => {
    await page.goto('/demo');
    const score = page.locator('#reqcheck-score');

    await page.getByRole('button', { name: 'Clear', exact: true }).click();
    await expect(score).toHaveText('--');
    await expect(page.locator('#reqcheck-findings li')).toHaveCount(0);

    await page.locator('#story').fill('As a user, I want to log in so that I can access my account.');
    await expect(score).toHaveText('40');
    await expect(page.locator('#reqcheck-score-label')).toHaveText('Unclear');
  });

  test('reads Gherkin written one step per line as a single criterion', async ({
    page,
  }) => {
    await page.goto('/demo');
    await page.getByRole('button', { name: 'Clean story' }).click();
    await page
      .locator('#criteria')
      .fill('Given an invalid password\nWhen I submit\nThen an error is displayed');
    await expect(page.locator('#reqcheck-score')).toHaveText('100');
    await expect(page.locator('#reqcheck-findings li')).toHaveCount(0);
  });
});
