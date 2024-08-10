import { AxiosError } from 'axios';
import { get } from 'svelte/store';
import Cookies from 'js-cookie';

import { instance } from './api';
import { accessTokenPayload, accessTokenStore } from '$lib/stores/userInfo';

const JWT_REFRESH_COOKIE_KEY = 'JWTRefreshToken';
const COOKIES_LIFETIME = 30; // days

interface TokenResponse {
	access: string;
	refresh: string;
}

const defaultCookieOptions: Cookies.CookieAttributes = {
	sameSite: 'strict',
	secure: true
} as const;

function accessTokenIsValid() {
	const payload = get(accessTokenPayload);
	if (payload === undefined) {
		return false;
	}

	const oneMinuteBeforeExp = payload.exp - 60;
	return Date.now() < oneMinuteBeforeExp * 1000;
}

export function handleLoggedin({ access, refresh }: TokenResponse, remember: boolean) {
	const config: Cookies.CookieAttributes = { ...defaultCookieOptions };
	if (remember) {
		config.expires = COOKIES_LIFETIME;
	}

	Cookies.set(JWT_REFRESH_COOKIE_KEY, refresh, config);
	accessTokenStore.set(access);
}

export function handleLoggedOut() {
	Cookies.remove(JWT_REFRESH_COOKIE_KEY, defaultCookieOptions);
	accessTokenStore.set(undefined);
}

export async function isAuthorized(): Promise<boolean> {
	if (accessTokenIsValid()) {
		return true;
	}

	await refreshAccessToken();
	return get(accessTokenStore) !== undefined;
}

export async function refreshAccessToken() {
	const refresh = Cookies.get(JWT_REFRESH_COOKIE_KEY);
	if (refresh === undefined) {
		accessTokenStore.set(undefined);
		return;
	}

	try {
		const response = await instance.post('/token/refresh/', { refresh });
		accessTokenStore.set(response.data.access);
	} catch (err) {
		if (!(err instanceof AxiosError)) {
			throw err;
		}

		const sessionExpired = err.response?.status === 401;
		if (sessionExpired) {
			accessTokenStore.set(undefined);
			return;
		}

		throw err;
	}
}

export async function getAccessToken(): Promise<string | undefined> {
	return (await isAuthorized()) ? get(accessTokenStore) : undefined;
}

export async function getAuthConfig() {
	const accessToken = await getAccessToken();
	if (accessToken === undefined) {
		return {};
	}

	return { headers: { Authorization: `Bearer ${accessToken}` } };
}
