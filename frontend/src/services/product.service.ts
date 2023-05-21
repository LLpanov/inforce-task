import { axiosService } from '@/services/axios.service.ts';

import { urls } from '@/config/urls.ts';
import { IProduct } from '@/interfaces/product.interface.ts';


export const productService = {
	getAll: (): Promise<IProduct[]> => axiosService.get(urls.product).then(res => res.data),

	getById: (id: number): Promise<IProduct> => axiosService.get(`${urls.product}/${id}`).then(res => res.data),

	createProduct: (data: IProduct) => axiosService.post('/product/admin', data).then(res => res.data),

	updateProduct: (id: number, data: IProduct): Promise<IProduct> =>
		axiosService.put(`/product/admin/${id}`, data).then(res => res.data),

	deleteProduct: (id: number): Promise<void> => axiosService.delete(`/product/admin/${id}`)
};