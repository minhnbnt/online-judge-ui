import axios, {
	type AxiosRequestHeaders,
	type AxiosResponseHeaders,
	type CreateAxiosDefaults
} from 'axios';
import { decode, encode } from '@msgpack/msgpack';

import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { dev } from '$app/environment';

const MSGPACK_CONTENT_TYPE = 'application/msgpack';

let textEncoder: TextDecoder | undefined;

function decodeResponse(data: ArrayBuffer, headers: AxiosResponseHeaders) {
	if (headers['content-type'] === MSGPACK_CONTENT_TYPE) {
		return decode(data);
	}

	if (textEncoder === undefined) {
		textEncoder = new TextDecoder('utf-8');
	}

	return JSON.parse(textEncoder.decode(data));
}

function encodeRequest(data: unknown, headers: AxiosRequestHeaders) {
	const isFromData = data instanceof FormData;
	if (!isFromData) {
		headers['Content-Type'] = MSGPACK_CONTENT_TYPE;
		data = encode(data);
	}

	return data;
}

let config: CreateAxiosDefaults = {
	baseURL: PUBLIC_API_BASE_URL
};

if (!dev) {
	config = {
		headers: { Accept: MSGPACK_CONTENT_TYPE },
		transformResponse: [decodeResponse],
		transformRequest: [encodeRequest],
		responseType: 'arraybuffer',
		...config
	};
}

export const instance = axios.create(config);
