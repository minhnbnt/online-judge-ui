import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const pageParams = url.searchParams.get('page');

	let activePage = 1;
	if (pageParams !== null) {
		activePage = parseInt(pageParams);
	}

	return { activePage };
};
