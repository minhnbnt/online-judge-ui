import { goto } from '$app/navigation';
import instance from '$lib/services/api';
import { getAccessToken } from '$lib/services/auth';
import { getCompilerVersion } from '$lib/utils/languages';

export default async function handleSubmit(problem: string, source: string, compilerName: string) {
	const accessToken = await getAccessToken();

	if (accessToken === undefined) {
		throw new Error('Please signin to perform this actions');
	}

	const version = await getCompilerVersion(compilerName);

	const payload = {
		problemId: problem,
		language: compilerName,
		version: version,
		source: source
	};

	const config = { headers: { Authorization: `Bearer ${accessToken}` } };

	const response = await instance.post('submissions/', payload, config);

	goto(`/submissions/${response.data.viewId}`);
}
