import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IProduct } from '@/interfaces/product.interface.ts';
import { productService } from '@/services/product.service.ts';
import { axiosService } from '@/services/axios.service.ts';

interface ProductState {
	products: IProduct[];
	selectedProduct: IProduct | null;
	loading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	products: [],
	selectedProduct: null,
	loading: false,
	error: null
};


export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
	try {
		return await productService.getAll();
	} catch (error) {
		throw new Error('Failed to fetch products');
	}
});

export const getProductById = createAsyncThunk('product/getProductById', async (id: number) => {
	try {
		return await productService.getById(id);
	} catch (error) {
		throw new Error('Failed to fetch product');
	}
});

export const createProduct = createAsyncThunk('product/createProduct', async (product: IProduct) => {
	try {
		return await productService.createProduct(product);
	} catch (error) {
		throw new Error('Failed to create product');
	}
});

export const updateProduct = createAsyncThunk(
	'product/updateProduct',
	async ({ id, updatedProduct }: { id: number; updatedProduct: IProduct }) => {
		try {
			const response = await axiosService.put(`/product/admin/${id}`, updatedProduct);
			console.log(response)
			return response.data;
		} catch (error) {
			throw new Error('Failed to update product');
		}
	}
)

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id: number) => {
	try {
		await productService.deleteProduct(id);
		return id;
	} catch (error) {
		throw new Error('Failed to delete product');
	}
});

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchProducts.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to get products';
			})
			.addCase(getProductById.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getProductById.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedProduct = action.payload;
			})
			.addCase(getProductById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch product';
			})
			.addCase(createProduct.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products.push(action.payload);
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to create product';
			})
			.addCase(updateProduct.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.loading = false;
				const { id, ...data } = action.payload;
				const index = state.products.findIndex(product => product.id === id);
				if (index !== -1) {
					state.products[index] = { ...state.products[index], ...data };
				}
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Fail';
			})

			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.products.findIndex(product => product.id === action.payload);
				if (index !== -1) {
					state.products.splice(index, 1);
				}
			});

	}
});

const productReducer = productSlice.reducer;
export { productReducer };