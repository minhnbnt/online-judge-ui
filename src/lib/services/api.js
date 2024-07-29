import axios from 'axios';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

export const instance = axios.create({
	baseURL: PUBLIC_API_BASE_URL
});
