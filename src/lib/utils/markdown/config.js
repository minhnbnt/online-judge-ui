import { Carta } from 'carta-md';

import { math } from '@cartamd/plugin-math';
import { component } from '@cartamd/plugin-component';
import { svelte, initializeComponents } from '@cartamd/plugin-component/svelte';

import DOMPurify from 'isomorphic-dompurify';

import Pre from './pre.svelte';

const mapped = [svelte('pre', Pre)];

const carta = new Carta({
	sanitizer: DOMPurify.sanitize,
	extensions: [math(), component(mapped, initializeComponents)]
});

export default carta;
importKatexCSS();

function importKatexCSS() {
	const katexCss = document.createElement('link');

	katexCss.rel = 'stylesheet';
	katexCss.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.css';
	katexCss.integrity = 'sha384-3UiQGuEI4TTMaFmGIZumfRPtfKQ3trwQE2JgosJxCnGmQpL/lJdjpcHkaaFwHlcI';
	katexCss.crossOrigin = 'anonymous';

	document.head.append(katexCss);
}
