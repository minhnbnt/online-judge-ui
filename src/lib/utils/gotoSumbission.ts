import { goto } from '$app/navigation';

import { instance } from '$lib/services/api';
import { getAuthConfig, isAuthorized } from '$lib/services/auth';

export default async function gotoSubmission(id: number) {
	// TODO: handle on session expired
	if (!(await isAuthorized())) {
		return;
	}

	const config = await getAuthConfig();
	const response = await instance.get(`/submissions/get/${id}`, config);

	await goto(`/submissions/${response.data.viewId}`);
}
