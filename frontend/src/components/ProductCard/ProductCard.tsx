import  { FC } from 'react';
import { Box, Text, Image, Flex, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { IProduct } from '@/interfaces/product.interface.ts';

interface IProductCardProps {
	product: IProduct;
}

const ProductCard: FC<IProductCardProps> = ({ product }) => {
	const navigate = useNavigate();

	return (
		<Box
			borderWidth='1px'
			borderRadius='md'
			padding='3'
			shadow='md'
			width='250px'
			minHeight='400px'
			display='flex'
			flexDirection='column'
			columnGap={8}
			justifyContent='flex-start'
		>
			<Image
				src={product.imageUrl}
				alt={product.name}
				height='150px'
				objectFit='cover'
				borderRadius={'lg'}

			/>
			<Text fontWeight='bold' fontSize='xl' marginTop='4'>
				{product.name}
			</Text>
			{product.size && (
				<Text fontSize='xm'>
					Size: {product.size.width} x {product.size.height}
				</Text>
			)}
			<Text fontSize='xm'>
				Weight: {product.weight}g
			</Text>
			<Text as={'span'} fontSize='md' color='mediumpurple' marginTop='2'>
				Count: {product.count}$
			</Text>
			<Flex justifyContent='space-between' marginTop='auto'>
				<Button colorScheme='green' onClick={()  => navigate(`/${product.id}`, { state: { product } })}>Detail</Button>
			</Flex>
		</Box>
	);
};

export { ProductCard };