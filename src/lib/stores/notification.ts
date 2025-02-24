import { get, writable } from 'svelte/store';
import { type Position } from 'svelte-notifications';

interface AddNotificationProps {
	id?: string;
	text: string;
	removeAfter: number;
	type?: 'success' | 'warning' | 'error';
	position?: Position;
}

// TODO: replace unknown by function type
export interface NotificationContext {
	addNotification: (props: AddNotificationProps) => void;
	clearNotifications: () => void;
	removeNotification: (id: string) => void;
	subscribe: unknown;
}

export const notifyContextStore = writable<NotificationContext>();

export function addNotification(props: AddNotificationProps) {
	const { addNotification } = get(notifyContextStore);
	addNotification(props);
}

export function clearNotifications() {
	const { clearNotifications } = get(notifyContextStore);
	clearNotifications();
}
