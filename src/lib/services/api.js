import axios from 'axios';
import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { getAccessToken } from './auth';

export const instance = axios.create({
	baseURL: PUBLIC_API_BASE_URL
});

export const instanceWithToken = axios.create({
	baseURL: PUBLIC_API_BASE_URL
});

instanceWithToken.interceptors.request.use(async (config) => {
	const accessToken = await getAccessToken();

	if (accessToken === undefined) {
		throw new Error("Access token doesn't exists or expired");
	}

	config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
});
