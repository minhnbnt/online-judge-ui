import 'katex/dist/katex.css';

async function carta() {
	const [
		{ Carta },
		{ default: DOMPurify },
		{ math },
		{ component },
		{ svelte, initializeComponents },
		{ default: Pre }
	] = await Promise.all([
		import('carta-md'),
		import('isomorphic-dompurify'),
		import('@cartamd/plugin-math'),
		import('@cartamd/plugin-component'),
		import('@cartamd/plugin-component/svelte'),
		import('./preElement.svelte')
	]);

	const mapped = [svelte('pre', Pre)];

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize,
		extensions: [math(), component(mapped, initializeComponents)]
	});

	return carta;
}

export default carta;
