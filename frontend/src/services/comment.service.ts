import { IComment } from '@/interfaces/comment.interface.ts'
	;
import { axiosService } from '@/services/axios.service.ts';
import { urls } from '@/config/urls.ts';
import { IProduct } from '@/interfaces/product.interface.ts';

export const commentService = {
	getByProductId: (productId: number): Promise<IComment[]> => axiosService.get(`${urls.comment}?productId=${productId}`).then(res => res.data),

	updateComment: (id: number, data: IComment): Promise<IProduct> => axiosService.put(`/comment/${id}`, data).then(res => res.data),

	createComment: (data: IComment): Promise<IComment> =>
		axiosService.post('/comment', data).then(res => res.data),

	deleteComment: (id: number): Promise<void> =>
		axiosService.delete(`${urls.comment}/${id}`)
};

