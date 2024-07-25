import { isAuthorized } from '$lib/services/auth';
import { goto } from '$app/navigation';

export async function load() {
	if (await isAuthorized()) {
		await goto('/problems');
		return;
	}

	await goto('/login');
}
