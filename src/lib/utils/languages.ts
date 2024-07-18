import axios from 'axios';

import { PUBLIC_API_LANGUAGE } from '$env/static/public';

export interface Language {
	name: string;
	compiler: string;
}

export const languages = [
	{ name: 'C', compiler: 'gcc' },
	{ name: 'C++', compiler: 'g++' },
	{ name: 'C#', compiler: 'c#.net' },
	{ name: 'Java', compiler: 'java' },
	{ name: 'Go', compiler: 'go' },
	{ name: 'Rust', compiler: 'rs' },
	{ name: 'Python 3', compiler: 'py3' }
];

interface LanguageResponse {
	language: string;
	version: string;
	aliases: Array<string>;
}

export async function getCompilerVersion(compilerName: string) {
	const response = await axios.get(PUBLIC_API_LANGUAGE);
	const entries = response.data as Array<LanguageResponse>;

	const target = entries.filter(({ language, aliases }) => {
		if (language === compilerName) {
			return true;
		}

		return aliases.some((name) => compilerName === name);
	});

	if (target.length === 0) {
		throw new Error(`${compilerName} does not exists`);
	}

	return target[0].version;
}
