import instance from '$lib/services/api';
import { goto } from '$app/navigation';
import { handleLoggedin } from '$lib/services/auth';
import type { AxiosError } from 'axios';

export default async function handleSubmit(formData: HTMLFormElement) {
	let response = undefined;

	try {
		response = await instance.postForm('/token/', formData);
	} catch (err) {
		const errorResponse = (err as AxiosError).response;

		if (errorResponse === undefined) {
			throw err;
		}

		return errorResponse;
	}

	handleLoggedin(response.data);
	goto('/problems');
}
