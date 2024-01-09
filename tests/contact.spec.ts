import { expect, test } from '@playwright/test';

test.describe('Contact', () => {
  test('has initial view', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'networkidle' });

    const h1 = await page.$('h1');
    const text = await h1?.textContent();
    expect(text).toContain("It's good to see you here");
  });

  test('has social link buttons', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'networkidle' });

    const github = page.getByTitle('Github Link');
    const instagram = page.getByTitle('Instagram Link');
    const linkedin = page.getByTitle('Linkedin Link');

    await expect(github).toBeVisible();
    await expect(instagram).toBeVisible();
    await expect(linkedin).toBeVisible();
  });

  test('has contact form', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'networkidle' });

    await expect(page.getByText('Name')).toBeVisible();
    await expect(page.getByText('Email')).toBeVisible();
    await expect(page.getByText('Message')).toBeVisible();
    await expect(page.getByText('Send an e-mail')).toBeVisible();
  });

  test("should show error message when don't fill all fields", async ({
    page,
  }) => {
    await page.goto('/contact', { waitUntil: 'networkidle' });

    await page.click('button[type=submit]');

    await expect(page.getByText('Invalid email')).toBeVisible();

    // name
    await expect(
      page.getByText('String must contain at least 4 character(s)'),
    ).toBeVisible();

    // message
    await expect(
      page.getByText('String must contain at least 8 character(s)'),
    ).toBeVisible();
  });

  test('should be able to send email and show success message', async ({
    page,
  }) => {
    await page.route('*/**/api/emails', async (route) => {
      await page.waitForTimeout(1000);
      await route.fulfill({ json: { ok: true }, status: 200 });
    });

    await page.goto('/contact', { waitUntil: 'networkidle' });

    await page.fill('input[name=name]', 'Lucas');
    await page.fill('input[name=email]', 'lucaxsilveira@gmail.com');
    await page.fill('textarea[name=message]', 'Hello, how are you?');

    await page.click('button[type=submit]');

    await expect(page.getByText('Sending e-mail')).toBeVisible();
    await page.waitForTimeout(1000);

    // button
    await expect(
      page.getByRole('button', { name: 'E-mail sent' }),
    ).toBeVisible();

    // toast
    await expect(page.getByText('Notification E-mail sent!')).toBeVisible();

    // must reset form
    await page.waitForTimeout(2510);
    await expect(page.getByText('Send an e-mail')).toBeVisible();
    await expect(page.getByPlaceholder('Harry')).toHaveValue('');
    await expect(page.getByPlaceholder('potter@hogwarts.com')).toHaveValue('');
    await expect(
      page.getByPlaceholder(
        'Which of the deathly hallows would you like to possess?',
      ),
    ).toHaveValue('');
  });
});
