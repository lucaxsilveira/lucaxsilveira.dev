import { expect, test } from '@playwright/test';

test.describe('Posts', () => {
  test('has initial view', async ({ page }) => {
    await page.goto('/posts', { waitUntil: 'networkidle' });

    const h1 = await page.$('h1');
    const text = await h1?.textContent();
    expect(text).toContain(
      "I'm still writing, but you can find some posts here.",
    );
  });

  test('should show posts list', async ({ page }) => {
    await page.goto('/posts', { waitUntil: 'networkidle' });

    const posts = await page.$$('.post');

    expect(posts.length).toBeGreaterThan(0);

    await expect(
      page
        .locator('h4')
        .getByText(
          'Creating extensions for Google Chrome with React and Typescript',
        ),
    ).toBeVisible();

    await expect(
      page.locator('h4').getByText('Composition Pattern'),
    ).toBeVisible();
  });
});
