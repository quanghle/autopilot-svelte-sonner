import { expect, test } from '@playwright/test';

// Run tests in parallel as they are independent
test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test('toast is rendered and disappears after the default timeout', async ({ page }) => {
	await page.getByTestId('default-button').click();
	await expect(page.locator('[data-sonner-toast]')).toHaveCount(1);
	await expect(page.locator('[data-sonner-toast]')).toHaveCount(0, { timeout: 10000 });
});

test('various toast types are rendered correctly', async ({ page }) => {
	await page.getByTestId('Success').click();
	await expect(page.getByText('Event has been created', { exact: true })).toHaveCount(1);

	await page.getByTestId('Error').click();
	await expect(page.getByText('Event has not been created', { exact: true })).toHaveCount(1);

	await page.getByTestId('Action').click();
	await expect(page.locator('[data-button]')).toHaveCount(1);
});

test('show correct toast content based on promise state', async ({ page }) => {
	await page.getByTestId('Promise').click();
	await expect(page.getByText('Loading...')).toHaveCount(1);
	await expect(page.getByText('Svelte Sonner toast has been added')).toHaveCount(1);
});

test('render custom component in toast', async ({ page }) => {
	await page.getByTestId('Custom').click();
	await expect(page.getByText('A custom toast with default styling')).toHaveCount(1);
});

test('toast is removed after swiping down', async ({ page }) => {
	await page.getByTestId('default-button').click();
	await expect(page.locator('[data-sonner-toast]')).toHaveCount(1);
	await page.hover('[data-sonner-toast]');
	await page.mouse.down();
	await page.mouse.move(0, 800);
	await page.mouse.up();
	await expect(page.locator('[data-sonner-toast]')).toHaveCount(0);
});

test('toast is not removed when hovered', async ({ page }) => {
	await page.getByTestId('default-button').click();
	await expect(page.locator('[data-sonner-toast]')).toHaveCount(1);
	await page.hover('[data-sonner-toast]');
	const timeout = new Promise((resolve) => setTimeout(resolve, 5000));
	await timeout;
	await expect(page.locator('[data-sonner-toast]')).toHaveCount(1);
});

test('close a toast from inside a custom component', async ({ page }) => {
	await page.getByTestId('other-Headless').click();
	await expect(page.getByText('Event Created')).toHaveCount(1);
	await page.getByTestId('close-button').click();
	await expect(page.getByText('Event Created')).toHaveCount(0);
});

test('render custom component with properties in toast of predefined type', async ({ page }) => {
	await page.getByTestId('other-Custom with properties').click();
	await expect(
		page.locator('[data-sonner-toast]').getByText('This is multiline message')
	).toHaveCount(1);
});

test('toast with description shows description text', async ({ page }) => {
	await page.getByTestId('Description').click();
	await expect(page.getByText('Event has been created')).toHaveCount(1);
	await expect(page.getByText('Monday, January 3rd at 6:00pm')).toHaveCount(1);
});

test('info toast is rendered correctly', async ({ page }) => {
	await page.getByTestId('Info').click();
	await expect(page.getByText('Event will be created')).toHaveCount(1);
	await expect(page.locator('[data-sonner-toast][data-type="info"]')).toHaveCount(1);
});

test('warning toast is rendered correctly', async ({ page }) => {
	await page.getByTestId('Warning').click();
	await expect(page.getByText('Event has warnings')).toHaveCount(1);
	await expect(page.locator('[data-sonner-toast][data-type="warning"]')).toHaveCount(1);
});

test('rich colors success toast has rich colors attribute', async ({ page }) => {
	await page.getByTestId('other-Rich Colors Success').click();
	await expect(page.getByText('Event has been created')).toHaveCount(1);
	await expect(page.locator('[data-sonner-toast][data-rich-colors="true"]')).toHaveCount(1);
});

test('rich colors error toast has rich colors attribute', async ({ page }) => {
	await page.getByTestId('other-Rich Colors Error').click();
	await expect(page.getByText('Event has not been created')).toHaveCount(1);
	await expect(page.locator('[data-sonner-toast][data-rich-colors="true"]')).toHaveCount(1);
});

test('close button is rendered when enabled', async ({ page }) => {
	await page.getByTestId('other-Close buttons').click();
	await expect(page.locator('[data-sonner-toast]')).toHaveCount(1);
	await expect(page.locator('[data-close-button]')).toHaveCount(1);
});
