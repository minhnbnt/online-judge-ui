import { page } from '$app/state';
import { goto } from '$app/navigation';

import queryString from 'query-string';

export default async function gotoLoginPage() {
	const { url } = page;

	const loginUrl = queryString.stringifyUrl({
		url: '/login',
		query: { next: url.pathname }
	});

	await goto(loginUrl);
}
