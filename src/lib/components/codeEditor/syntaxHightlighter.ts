const legacyModes = ['kt', 'lua', 'pas', 'sc', 'swift'];

export default async function getSyntaxHightlighter(name: string) {
	if (legacyModes.some((mode) => name === mode)) {
		return await getLegacySyntaxHightlighter(name);
	}

	switch (name) {
		case 'gcc':
		case 'g++': {
			const { cpp } = await import('@codemirror/lang-cpp');
			return cpp();
		}

		case 'c#.net': {
			const { csharp } = await import('@replit/codemirror-lang-csharp');
			return csharp();
		}

		case 'java': {
			const { java } = await import('@codemirror/lang-java');
			return java();
		}

		case 'rs': {
			const { rust } = await import('@codemirror/lang-rust');
			return rust();
		}

		case 'go': {
			const { go } = await import('@codemirror/lang-go');
			return go();
		}

		case 'py3': {
			const { python } = await import('@codemirror/lang-python');
			return python();
		}

		case 'markdown': {
			const { markdown } = await import('@codemirror/lang-markdown');
			return markdown();
		}

		default:
			return undefined;
	}
}

async function getLegacySyntaxHightlighter(name: string) {
	const { StreamLanguage } = await import('@codemirror/language');

	switch (name) {
		case 'lua': {
			const { lua } = await import('@codemirror/legacy-modes/mode/lua');
			return StreamLanguage.define(lua);
		}

		case 'kt': {
			const { kotlin } = await import('@codemirror/legacy-modes/mode/clike');
			return StreamLanguage.define(kotlin);
		}

		case 'pas': {
			const { pascal } = await import('@codemirror/legacy-modes/mode/pascal');
			return StreamLanguage.define(pascal);
		}

		case 'sc': {
			const { scala } = await import('@codemirror/legacy-modes/mode/clike');
			return StreamLanguage.define(scala);
		}

		case 'swift': {
			const { swift } = await import('@codemirror/legacy-modes/mode/swift');
			return StreamLanguage.define(swift);
		}

		default:
			return undefined;
	}
}
