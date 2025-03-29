import axios from 'axios';
import { type AxiosResponse } from 'axios';
import { decode } from 'msgpack-lite';

import { PUBLIC_API_BASE_URL } from '$env/static/public';

export const instance = axios.create({
	baseURL: PUBLIC_API_BASE_URL,
	headers: {
		Accept: 'application/msgpack'
	},
	responseType: 'arraybuffer'
});

function decodeResponse(response: AxiosResponse) {
	if (response.data) {
		response.data = decode(new Uint8Array(response.data));
	}

	return response;
}

instance.interceptors.response.use(
	decodeResponse,
	decodeResponse //
);
