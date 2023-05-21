import { FC, useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { ProductModal } from '@/components/ProductModal/ProductModal.tsx';

const Header: FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleAddProduct = () => {

		setIsModalOpen(true);
	};

	const handleCloseModal = () => {

		setIsModalOpen(false);
	};

	return (
		<>
			<Box as='header' bg='blackAlpha.500' py={4}>
				<Flex maxW='container.xl' mx='auto' justifyContent='space-around' alignItems='center' columnGap={10}>
					<Link to='/product/admin'>
						<Text fontSize='sm' fontWeight='bold'>Admin</Text>
					</Link>
					<Link to='/product'>
						<Text fontSize='sm' fontWeight='bold'>Products</Text>
					</Link>
					<Button onClick={handleAddProduct} colorScheme='facebook' variant='outline'>
						AddProduct
					</Button>
				</Flex>
			</Box>
			{isModalOpen && (
				<Flex justifyContent='center' alignItems='center' padding={5}>
					<ProductModal onClose={handleCloseModal} onSubmitForm={handleAddProduct} />
				</Flex>
			)}
		</>
	);
};

export { Header };


