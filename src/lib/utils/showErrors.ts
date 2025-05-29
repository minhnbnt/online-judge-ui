import { addNotification } from '$lib/stores/notification';

export function showError(message: string) {
	addNotification({
		text: message,
		position: 'bottom-right',
		type: 'error',
		removeAfter: 5000
	});
}
