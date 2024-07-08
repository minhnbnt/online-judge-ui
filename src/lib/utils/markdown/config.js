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
