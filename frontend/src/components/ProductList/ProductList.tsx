import { FC, useEffect } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import { RootState } from '@/store/store.ts';
import { ProductCard } from '@/components/ProductCard/ProductCard.tsx';
import { IProduct } from '@/interfaces/product.interface.ts';
import { fetchProducts } from '@/store/Slices/product.slice.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks.ts';

const ProductList: FC = () => {
	const dispatch = useAppDispatch();
	const { products } = useAppSelector(((state: RootState) => state.productReducer));

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	return (

			<Grid templateColumns="repeat(3, 1fr)" placeItems={'center'} marginTop={4} gap={4}>
				{products.map((product: IProduct) => (
					<GridItem key={product.id}>
						<ProductCard product={product} />
					</GridItem>
				))}
			</Grid>
	);
};


export { ProductList };