import { expect, test } from '@playwright/test';

test.describe('Post Page', () => {
  test('has initial view', async ({ page }) => {
    await page.goto('/posts/composition-pattern-in-react', {
      waitUntil: 'networkidle',
    });

    const h1 = await page.$('h1');
    const text = await h1?.textContent();
    expect(text).toContain('Composition Pattern');

    const author = await page.$$('.post__author');
    expect(author.length).toBeGreaterThan(0);

    await expect(page.getByText('Lucas Silveira')).toBeVisible();
    await expect(page.getByText('Are you already using')).toBeVisible();
    await expect(page.getByText('You may also like:')).toBeVisible();
  });
});
