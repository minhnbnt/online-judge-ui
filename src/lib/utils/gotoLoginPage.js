import { page } from '$app/stores';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import queryString from 'query-string';

export default async function gotoLoginPage() {
	const { url } = get(page);

	const loginUrl = queryString.stringifyUrl({
		url: '/login',
		query: { next: url.pathname }
	});

	await goto(loginUrl);
}
