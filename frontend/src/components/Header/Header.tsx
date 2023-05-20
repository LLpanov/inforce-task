import { FC } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header: FC = () => {
	return (
		<Box as='header' bg='blackAlpha.500' py={4}>
			<Flex maxW='container.xl' mx='auto' justifyContent='center' alignItems='center' columnGap={10}>
				<Link to='product/admin'>
					<Text fontSize='sm' fontWeight='bold'>Admin</Text>
				</Link>
				<Link to='/products'>
					<Text fontSize='sm' fontWeight='bold'>Products</Text>
				</Link>
			</Flex>
		</Box>
	);
};

export { Header };