import axios, { type AxiosRequestHeaders, type AxiosResponseHeaders } from 'axios';
import { decode, encode } from '@msgpack/msgpack';

import { PUBLIC_API_BASE_URL } from '$env/static/public';

const MSGPACK_CONTENT_TYPE = 'application/msgpack';

function encodeRequest(data: unknown, headers: AxiosRequestHeaders) {
	if (!(data instanceof FormData)) {
		headers['Content-Type'] = MSGPACK_CONTENT_TYPE;
		data = encode(data);
	}

	return data;
}

function decodeResponse(data: ArrayBuffer, headers: AxiosResponseHeaders) {
	if (headers['content-type'] === MSGPACK_CONTENT_TYPE) {
		return decode(data);
	}

	return data;
}

export const instance = axios.create({
	headers: { Accept: MSGPACK_CONTENT_TYPE },
	transformResponse: [decodeResponse],
	transformRequest: [encodeRequest],
	baseURL: PUBLIC_API_BASE_URL,
	responseType: 'arraybuffer'
});
