import { page } from '$app/state';
import { goto } from '$app/navigation';

export default async function gotoLoginPage() {
	const { default: queryString } = await import('query-string');
	const { url } = page;

	const loginUrl = queryString.stringifyUrl({
		url: '/login',
		query: { next: url.pathname }
	});

	await goto(loginUrl);
}
