import { goto } from '$app/navigation';

import { instance } from '$lib/services/api';
import { getAuthConfig, isAuthorized } from '$lib/services/auth';
import { getCompilerVersion } from '$lib/utils/languages';

import { type Language } from '$lib/types/languages';

async function handleSubmit(problem: string, source: string, language: Language | undefined) {
	if (language === undefined) {
		throw new Error('Please choose a language to continue');
	}

	if (!(await isAuthorized())) {
		throw new Error('Please sign in to perform this actions');
	}

	const version = await getCompilerVersion(language.compiler);

	const payload = {
		problem: problem,
		language: language.compiler,
		version: version,
		source: source
	};

	const config = await getAuthConfig();
	const response = await instance.post('submissions/', payload, config);

	await goto(`/submissions/${response.data.viewId}`);
}

export default handleSubmit;
