import { instance } from '$lib/services/api';
import { getAuthConfig, isAuthorized } from '$lib/services/auth';
import { addNotification } from '$lib/stores/notification';
import { AxiosError } from 'axios';

export default async function addComment(problemId: string, comment: string) {
	if (comment.length === 0) {
		addNotification({
			text: 'Cannot send empty comment.',
			position: 'bottom-center',
			removeAfter: 5000,
			type: 'error'
		});

		return;
	}

	if (!(await isAuthorized())) {
		addNotification({
			text: 'Please signin to perform this action.',
			position: 'bottom-center',
			removeAfter: 5000,
			type: 'error'
		});

		return;
	}

	try {
		const config = await getAuthConfig();
		await instance.post(`/comments/`, { problem: problemId, comment }, config);
	} catch (e) {
		if (!(e instanceof AxiosError)) {
			throw e;
		}

		addNotification({ text: e.message, removeAfter: 5000, type: 'error' });
		return;
	}
}
