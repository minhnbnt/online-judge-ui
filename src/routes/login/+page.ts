import type { PageLoad } from '../$types';

export const load: PageLoad = ({ url }) => {
	let nextUrl = url.searchParams.get('next');
	if (nextUrl === null) {
		nextUrl = '/';
	}

	return { nextUrl };
};
