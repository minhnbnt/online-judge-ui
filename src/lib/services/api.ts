import axios, { type AxiosResponse, type AxiosError } from 'axios';
import { decode } from '@msgpack/msgpack';

import { PUBLIC_API_BASE_URL } from '$env/static/public';

const MSGPACK = 'application/msgpack';

export const instance = axios.create({
	baseURL: PUBLIC_API_BASE_URL,
	headers: { Accept: MSGPACK },
	responseType: 'arraybuffer'
});

function decodeResponse(response: AxiosResponse) {
	const contentType = response.headers['content-type'];
	const needDecodeResponse = response.data && contentType === MSGPACK;

	if (needDecodeResponse) {
		response.data = decode(new Uint8Array(response.data));
	}

	return response;
}

function onError(error: AxiosError) {
	if (error.response !== undefined) {
		error.response = decodeResponse(error.response);
	}

	return Promise.reject(error);
}

instance.interceptors.response.use(decodeResponse, onError);
