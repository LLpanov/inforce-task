import axios from 'axios';
import { baseUrl } from '@/config/urls.ts';


export const axiosService = axios.create({
	baseURL: baseUrl
});