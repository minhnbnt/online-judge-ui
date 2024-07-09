import { isAuthorized } from '$lib/services/auth';

export const ssr = false;

export const load = async () => {
	await isAuthorized();
};
