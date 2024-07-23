import { StreamLanguage } from '@codemirror/language';

import { cpp } from '@codemirror/lang-cpp';
import { go } from '@codemirror/lang-go';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { csharp } from '@replit/codemirror-lang-csharp';
import { markdown } from '@codemirror/lang-markdown';

import { kotlin, scala } from '@codemirror/legacy-modes/mode/clike';
import { pascal } from '@codemirror/legacy-modes/mode/pascal';
import { lua } from '@codemirror/legacy-modes/mode/lua';
import { swift } from '@codemirror/legacy-modes/mode/swift';

export default function getSyntaxHightlighter(name: string) {
	switch (name) {
		case 'gcc':
		case 'g++':
			return cpp();

		case 'c#.net':
			return csharp();

		case 'java':
			return java();

		case 'rs':
			return rust();

		case 'go':
			return go();

		case 'py3':
			return python();

		case 'markdown':
			return markdown();

		case 'lua':
			return StreamLanguage.define(lua);

		case 'kt':
			return StreamLanguage.define(kotlin);

		case 'pas':
			return StreamLanguage.define(pascal);

		case 'sc':
			return StreamLanguage.define(scala);

		case 'swift':
			return StreamLanguage.define(swift);

		default:
			return undefined;
	}
}
