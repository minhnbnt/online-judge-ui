import { readonly, writable } from "svelte/store";

function isDarkModePreferred() {
	if (!window.matchMedia) {
		return false;
	}

	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return true
	}

	return false;
}

const darkModeStore = writable<boolean>(isDarkModePreferred());
export const darkMode = readonly(darkModeStore);

export function toggleDarkMode() {
	darkModeStore.update((prev) => !prev)
}
