import { get, readonly, writable } from 'svelte/store';

const DARK_MODE_STATE_KEY = 'darkModeEnable';

function isDarkModePreferred() {
	const savedValue = localStorage.getItem(DARK_MODE_STATE_KEY);
	if (savedValue !== null) {
		return savedValue === 'true';
	}

	if (!window?.matchMedia) {
		return false;
	}

	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return true;
	}

	return false;
}

const darkModeStore = writable<boolean>(isDarkModePreferred());
export const darkMode = readonly(darkModeStore);

export function toggleDarkMode() {
	const newValue = !get(darkModeStore);

	localStorage.setItem(DARK_MODE_STATE_KEY, String(newValue));
	darkModeStore.set(newValue);
}