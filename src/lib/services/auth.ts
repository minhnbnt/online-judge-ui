import { get } from 'svelte/store';
import { decodeJwt } from 'jose';
import Cookies from 'js-cookie';

import { instance } from './api';
import { accessTokenStore } from '$lib/stores/userInfo';

const JWT_REFRESH_COOKIE_KEY = 'JWTRefreshToken';
const COOKIES_LIFETIME = 30; // days

interface TokenResponse {
	access: string;
	refresh: string;
}

interface TokenPayload {
	token_type: string;
	exp: number;
	iat: number;
	jti: string;
	user_id: number;
}

const defaultCookieOptions: Cookies.CookieAttributes = {
	sameSite: 'strict',
	secure: true
} as const;

function accessTokenIsValid() {
	const token = get(accessTokenStore);

	if (token === undefined) {
		return false;
	}

	const payload = decodeJwt<TokenPayload>(token);

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

	const refresh = Cookies.get(JWT_REFRESH_COOKIE_KEY);
	if (refresh === undefined) {
		accessTokenStore.set(undefined);
		return false;
	}

	try {
		const response = await instance.post('/token/refresh/', { refresh });
		const { access } = response.data;

		accessTokenStore.set(access);
		return true;
	} catch (err) {
		accessTokenStore.set(undefined);
		console.error(err);
		return false;
	}
}

export async function refreshAccessToken() {
	await isAuthorized();
}

export async function getAccessToken(): Promise<string | undefined> {
	return (await isAuthorized()) ? get(accessTokenStore) : undefined;
}
