import { goto } from '$app/navigation';

export default async function gotoUserProfile(userId: number) {
	await goto(`/user/${userId}`);
}
