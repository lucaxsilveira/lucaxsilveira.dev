import { expect, test } from '@playwright/test';

test.describe('Home', () => {
  test('has initial view', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const h1 = await page.$('h1');
    const text = await h1?.textContent();
    const imgProfile = page.getByAltText('lucas');

    expect(text).toContain('Lucas');
    await expect(imgProfile).toBeVisible();

    await expect(page.getByText('Lover of technology')).toBeVisible();
  });

  test('has social link buttons', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const github = page.getByTitle('Github Link');
    const instagram = page.getByTitle('Instagram Link');
    const linkedin = page.getByTitle('Linkedin Link');

    await expect(github).toBeVisible();
    await expect(instagram).toBeVisible();
    await expect(linkedin).toBeVisible();
  });

  test('has experience section', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    await expect(page.getByText('Globo')).toBeVisible();
    await expect(page.getByText('SolucioneRH')).toBeVisible();
    await expect(page.getByText('Freelancer')).toBeVisible();
    await expect(page.getByText('Bela Pagamentos')).toBeVisible();
  });

  test.skip('should be able to trigger shortcut actions with keyboard', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // on Windows and Linux
    await page.keyboard.press('Control+K');
    await page.waitForTimeout(1000);

    await expect(
      page.getByPlaceholder('Type a command or search by name...'),
    ).toBeVisible();
  });
});
