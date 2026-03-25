import { describe, it } from 'vitest';
import ToastTest from './ToastTest.svelte';
import { render, waitFor } from '@testing-library/svelte';
import { userEvent } from '@testing-library/user-event';
import { toast, toastState } from '$lib/toast-state.svelte.js';
import { sleep } from './utils.js';

function setup(props: { cb: (t: typeof toast) => void }) {
	const user = userEvent.setup();
	const returned = render(ToastTest, { props });
	const trigger = returned.getByTestId('trigger');

	return {
		trigger,
		user,
		...returned
	};
}

describe('Toast', () => {
	beforeEach(() => {
		toastState.reset();
	});

	it('should show a toast', async () => {
		const { user, trigger, container, getByText } = setup({
			cb: (toast) => toast('Hello world')
		});

		await user.click(trigger);
		expect(getByText('Hello world')).toBeVisible();

		const toasts = Array.from(container.querySelectorAll<HTMLElement>('[data-sonner-toast]'));
		expect(toasts.length).toBe(1);
	});

	it('should show a toast with a custom duration', async () => {
		const { user, trigger, queryByText } = setup({
			cb: (toast) => toast('Hello world', { duration: 300 })
		});

		expect(queryByText('Hello world')).toBeNull();

		await user.click(trigger);
		waitFor(() => expect(queryByText('Hello world')).not.toBeNull());

		await sleep(500);
		expect(queryByText('Hello world')).toBeNull();
	});

	it('should focus the toast when hotkey is pressed', async () => {
		const { user, trigger, getByText } = setup({
			cb: (toast) => toast('Hello world', { duration: 5000 })
		});

		await user.click(trigger);
		expect(getByText('Hello world')).toBeVisible();

		await user.keyboard('{Alt>}T{/Alt}');
		await sleep(100);
		expect(document.activeElement).toBeInstanceOf(HTMLOListElement);
	});

	it('should not immediately close the toast when reset', async () => {
		const { user, trigger, getByText, queryByText } = setup({
			cb: (toast) => {
				const id = toast('Loading', { duration: 4000 });

				setTimeout(() => {
					toast.success('Finished loading!', { id });
				}, 1000);
			}
		});

		await user.click(trigger);
		expect(getByText('Loading')).toBeVisible();
		await sleep(2050);
		expect(queryByText('Loading')).toBeNull();
		expect(getByText('Finished loading!')).toBeVisible();
		await sleep(1000);
		expect(getByText('Finished loading!')).toBeVisible();
	});

	it('should reset duration on a toast update', async () => {
		const { user, trigger, getByText, queryByText } = setup({
			cb: (toast) => {
				const id = toast('Loading', { duration: 1000 });

				setTimeout(() => {
					toast.success('Finished loading!', { id });
				}, 750);
			}
		});

		await user.click(trigger);
		expect(getByText('Loading')).toBeVisible();
		await sleep(800);
		expect(queryByText('Loading')).toBeNull();
		expect(getByText('Finished loading!')).toBeVisible();
		// there would only be ~.5 second left on the original toast
		// so we're gonna wait 2 seconds to make sure the timer is reset
		await sleep(600);
		expect(getByText('Finished loading!')).toBeVisible();
		// finally we'll wait another 1500ms to make sure the toast closes after 2 seconds
		// since the original toast had a duration of 2 seconds
		await sleep(600);
		expect(queryByText('Finished loading!')).toBeNull();
	});

	it('should allow duration updates on toast update', async () => {
		const { user, trigger, getByText, queryByText } = setup({
			cb: (toast) => {
				const id = toast('Loading', { duration: 2000 });

				setTimeout(() => {
					toast.success('Finished loading!', { id, duration: 4000 });
				}, 1000);
			}
		});

		await user.click(trigger);
		expect(getByText('Loading')).toBeVisible();
		await sleep(1200);
		expect(queryByText('Loading')).toBeNull();
		expect(getByText('Finished loading!')).toBeVisible();
		await sleep(2200);
		expect(getByText('Finished loading!')).toBeVisible();
	});

	it('should show a success toast', async () => {
		const { user, trigger, container, getByText } = setup({
			cb: (toast) => toast.success('Operation successful')
		});

		await user.click(trigger);
		expect(getByText('Operation successful')).toBeVisible();

		const toastEl = container.querySelector<HTMLElement>('[data-sonner-toast]');
		expect(toastEl?.dataset.type).toBe('success');
	});

	it('should show an error toast', async () => {
		const { user, trigger, container, getByText } = setup({
			cb: (toast) => toast.error('Something went wrong')
		});

		await user.click(trigger);
		expect(getByText('Something went wrong')).toBeVisible();

		const toastEl = container.querySelector<HTMLElement>('[data-sonner-toast]');
		expect(toastEl?.dataset.type).toBe('error');
	});

	it('should show a warning toast', async () => {
		const { user, trigger, container, getByText } = setup({
			cb: (toast) => toast.warning('Be careful')
		});

		await user.click(trigger);
		expect(getByText('Be careful')).toBeVisible();

		const toastEl = container.querySelector<HTMLElement>('[data-sonner-toast]');
		expect(toastEl?.dataset.type).toBe('warning');
	});

	it('should show an info toast', async () => {
		const { user, trigger, container, getByText } = setup({
			cb: (toast) => toast.info('Here is some info')
		});

		await user.click(trigger);
		expect(getByText('Here is some info')).toBeVisible();

		const toastEl = container.querySelector<HTMLElement>('[data-sonner-toast]');
		expect(toastEl?.dataset.type).toBe('info');
	});

	it('should show a loading toast', async () => {
		const { user, trigger, container, getByText } = setup({
			cb: (toast) => toast.loading('Loading data...')
		});

		await user.click(trigger);
		expect(getByText('Loading data...')).toBeVisible();

		const toastEl = container.querySelector<HTMLElement>('[data-sonner-toast]');
		expect(toastEl?.dataset.type).toBe('loading');
	});

	it('should show multiple toasts', async () => {
		const { user, trigger, container } = setup({
			cb: (toast) => {
				toast('First toast');
				toast('Second toast');
				toast('Third toast');
			}
		});

		await user.click(trigger);

		const toasts = container.querySelectorAll('[data-sonner-toast]');
		expect(toasts.length).toBe(3);
	});

	it('should show toast with description', async () => {
		const { user, trigger, getByText } = setup({
			cb: (toast) =>
				toast('Event created', { description: 'Monday, January 3rd at 6:00pm' })
		});

		await user.click(trigger);
		expect(getByText('Event created')).toBeVisible();
		expect(getByText('Monday, January 3rd at 6:00pm')).toBeVisible();
	});

	it('should show toast with action button', async () => {
		const { user, trigger, container, getByText } = setup({
			cb: (toast) =>
				toast.message('File deleted', {
					action: {
						label: 'Undo',
						onClick: () => {}
					}
				})
		});

		await user.click(trigger);
		expect(getByText('File deleted')).toBeVisible();

		const actionButton = container.querySelector('[data-button]');
		expect(actionButton).not.toBeNull();
		expect(actionButton?.textContent).toBe('Undo');
	});

	it('should dismiss a specific toast by id', async () => {
		const { user, trigger, queryByText, getByText } = setup({
			cb: (toast) => {
				const id = toast('Toast to dismiss', { duration: 10000 });
				toast('Toast to keep', { duration: 10000 });

				setTimeout(() => {
					toast.dismiss(id);
				}, 200);
			}
		});

		await user.click(trigger);
		expect(getByText('Toast to dismiss')).toBeVisible();
		expect(getByText('Toast to keep')).toBeVisible();
		await sleep(500);
		expect(queryByText('Toast to dismiss')).toBeNull();
		expect(getByText('Toast to keep')).toBeVisible();
	});

	it('should dismiss all toasts when no id is provided', async () => {
		const { user, trigger, queryByText, getByText } = setup({
			cb: (toast) => {
				toast('First toast', { duration: 10000 });
				toast('Second toast', { duration: 10000 });

				setTimeout(() => {
					toast.dismiss();
				}, 200);
			}
		});

		await user.click(trigger);
		expect(getByText('First toast')).toBeVisible();
		expect(getByText('Second toast')).toBeVisible();
		await sleep(500);
		expect(queryByText('First toast')).toBeNull();
		expect(queryByText('Second toast')).toBeNull();
	});

	it('should return active toasts excluding dismissed ones', async () => {
		const { user, trigger } = setup({
			cb: (toast) => {
				toast('Active toast', { duration: 10000 });
				const id = toast('Will be dismissed', { duration: 10000 });
				toast.dismiss(id);
			}
		});

		await user.click(trigger);
		const activeToasts = toast.getActiveToasts();
		expect(activeToasts.length).toBe(1);
		expect(activeToasts[0]?.title).toBe('Active toast');
	});

	it('should update an existing toast when using the same id', async () => {
		const { user, trigger, getByText, queryByText } = setup({
			cb: (toast) => {
				const id = toast('Original message', { duration: 10000 });

				setTimeout(() => {
					toast('Updated message', { id, duration: 10000 });
				}, 200);
			}
		});

		await user.click(trigger);
		expect(getByText('Original message')).toBeVisible();
		await sleep(400);
		expect(queryByText('Original message')).toBeNull();
		expect(getByText('Updated message')).toBeVisible();
	});

	it('should handle promise toast success', async () => {
		const { user, trigger, getByText } = setup({
			cb: (toast) => {
				toast.promise(
					() =>
						new Promise<{ name: string }>((resolve) =>
							setTimeout(() => resolve({ name: 'Test' }), 200)
						),
					{
						loading: 'Loading...',
						success: (data: { name: string }) => `${data.name} completed`,
						error: 'Failed'
					}
				);
			}
		});

		await user.click(trigger);
		expect(getByText('Loading...')).toBeVisible();
		await sleep(500);
		expect(getByText('Test completed')).toBeVisible();
	});

	it('should handle promise toast error', async () => {
		const { user, trigger, getByText } = setup({
			cb: (toast) => {
				toast.promise(
					() => new Promise((_resolve, reject) => setTimeout(() => reject('fail'), 200)),
					{
						loading: 'Loading...',
						success: 'Done',
						error: 'Something failed'
					}
				);
			}
		});

		await user.click(trigger);
		expect(getByText('Loading...')).toBeVisible();
		await sleep(500);
		expect(getByText('Something failed')).toBeVisible();
	});
});
