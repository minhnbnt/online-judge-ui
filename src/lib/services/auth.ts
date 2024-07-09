import { get, writable } from 'svelte/store';
import { decodeJwt } from 'jose';
import Cookies from 'js-cookie';

import instance from './api';

const JWT_REFRESH_COOKIE_KEY = 'JWTRefreshToken';

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
	username: string;
	is_staff: boolean;
}

const defaultCookieOptions = {
	secure: true
};

export const accessToken = writable<string | null>(null);

function accessTokenIsValid() {
	const token = get(accessToken);

	if (token === null) {
		return false;
	}

	const payload = decodeJwt<TokenPayload>(token);

	const oneMinuteBeforeExp = payload.exp - 60;
	return Date.now() < oneMinuteBeforeExp * 1000;
}

export function handleLoggedin({ access, refresh }: TokenResponse) {
	Cookies.set(JWT_REFRESH_COOKIE_KEY, refresh, defaultCookieOptions);
	accessToken.set(access);
}

export async function isAuthorized(): Promise<boolean> {
	if (accessTokenIsValid()) {
		return true;
	}

	const refresh = Cookies.get(JWT_REFRESH_COOKIE_KEY);
	if (refresh === undefined) {
		return false;
	}

	try {
		const response = await instance.post('/token/refresh/', { refresh });
		const { access } = response.data;

		accessToken.set(access);

		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
}

export async function getAccessToken(): Promise<string | null> {
	return (await isAuthorized()) ? get(accessToken) : null;
}