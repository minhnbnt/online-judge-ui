import { decodeJwt } from 'jose';

import { instance } from './api';
import { type UserInfoResponse } from '$lib/types/userInfo';

// TODO: add error handling
export async function fetchUserInfo(accessToken: string) {
	const config = {
		headers: { Authorization: `Bearer ${accessToken}` }
	};

	const { user_id } = decodeJwt(accessToken);

	const response = await instance.get(`/users/info/${user_id}`, config);
	return response.data as UserInfoResponse;
}
