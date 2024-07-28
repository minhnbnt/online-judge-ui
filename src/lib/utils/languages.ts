import { instance } from '$lib/services/api';
import type { Language } from '$lib/types/languages';

export const languages: Array<Language> = [
	{ name: 'C', compiler: 'gcc' },
	{ name: 'C++', compiler: 'g++' },
	{ name: 'C#', compiler: 'c#.net' },
	{ name: 'Java', compiler: 'java' },
	{ name: 'Kotlin', compiler: 'kt' },
	{ name: 'Scala 3', compiler: 'sc' },
	{ name: 'Pascal', compiler: 'pas' },
	{ name: 'Swift', compiler: 'swift' },
	{ name: 'Go', compiler: 'go' },
	{ name: 'Rust', compiler: 'rs' },
	{ name: 'Python 3', compiler: 'py3' },
	{ name: 'Lua', compiler: 'lua' }
];

interface LanguageResponse {
	language: string;
	version: string;
	aliases: Array<string>;
}

export async function getCompilerVersion(compilerName: string) {
	const response = await instance.get('/runtimes/');
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
