import { writable } from 'svelte/store';

interface AddNotificationProps {
	id?: string;
	text: string;
	removeAfter: number;
	type?: 'success' | 'warning' | 'error';
	position?:
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right';
}

// TODO: replace unknown by function type
interface ContextType {
	addNotification: (props: AddNotificationProps) => void;
	clearNotifications: () => void;
	removeNotification: unknown;
	subscribe: unknown;
}

export const notifyContextStore = writable<ContextType>();
