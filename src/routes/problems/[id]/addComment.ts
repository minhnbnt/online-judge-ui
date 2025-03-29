import { instance } from '$lib/services/api';
import { getAuthConfig, isAuthorized } from '$lib/services/auth';
import { addNotification } from '$lib/stores/notification';
import { AxiosError } from 'axios';

export default async function addComment(problemId: string, comment: string) {
	if (!(await isAuthorized())) {
		addNotification({
			text: 'Please signin to perform this action.',
			removeAfter: 5000,
			type: 'error'
		});

		return;
	}

	try {
		await instance.post(
			`/problems/${problemId}/comments/`, //
			{ comment },
			await getAuthConfig()
		);
	} catch (e) {
		if (!(e instanceof AxiosError)) {
			throw e;
		}

		addNotification({ text: e.message, removeAfter: 5000, type: 'error' });
		return;
	}

	if (location !== undefined) {
		location.reload();
	}
}
