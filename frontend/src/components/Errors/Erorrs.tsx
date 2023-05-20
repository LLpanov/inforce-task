import { FC } from 'react';
import { Box, Text, Center } from '@chakra-ui/react';

const Erorrs: FC = () => {
	return (
		<Center height='100vh' background={'black'}>
			<Box>
				<Text color='red.600' fontSize={'3xl'}>Not Found Page</Text>
			</Box>
		</Center>
	);
};

export { Erorrs };