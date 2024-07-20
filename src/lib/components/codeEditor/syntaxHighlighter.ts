import { cpp } from '@codemirror/lang-cpp';
import { go } from '@codemirror/lang-go';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { csharp } from '@replit/codemirror-lang-csharp';

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
	}
}
