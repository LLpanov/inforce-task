import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { productReducer } from '@/store/Slices/product.slice.ts';
import { commentReducer } from '@/store/Slices/comment.slice.ts';


const rootReducer = combineReducers({
	productReducer,
	commentReducer
});


export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];