import { goto } from '$app/navigation';

import { instance } from '$lib/services/api';
import { getCompilerVersion } from '$lib/utils/languages';
import { getAuthConfig, isAuthorized } from '$lib/services/auth';

import { type Language } from '$lib/types/languages';
import { addNotification } from '$lib/stores/notification';

async function handleSubmit(problem: string, source: string, language: Language | undefined) {
	try {
		if (language === undefined) {
			throw new Error('Please choose a language to continue');
		}

		if (!(await isAuthorized())) {
			throw new Error('Please sign in to perform this actions');
		}

		const [version, config] = await Promise.all([
			getCompilerVersion(language.compiler),
			getAuthConfig()
		]);

		const payload = {
			problem: problem,
			language: language.compiler,
			version: version,
			source: source
		};

		const response = await instance.post('submissions/', payload, config);
		await goto(`/submissions/${response.data.viewId}`);
	} catch (err) {
		if (!(err instanceof Error)) {
			throw err;
		}

		addNotification({
			type: 'error',
			text: err.message,
			removeAfter: 4000,
			position: 'bottom-center'
		});
	}
}

export default handleSubmit;
