import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup } from '@chakra-ui/react';
import { useAppDispatch } from '@/hooks/hooks.ts';
import { createProduct } from '@/store/Slices/product.slice.ts';

interface IFormData {
	imageUrl?: string;
	name: string;
	count: number;
	size?: ISize;
	weight: string;
}

interface ISize {
	width: number;
	height: number;
}

interface IProductModalProps {
	onClose: () => void;
	onSubmitForm: (data: IFormData) => void;
}

const ProductModal: FC<IProductModalProps> = ({ onClose }) => {
	const { handleSubmit, register, reset, formState: { errors } } = useForm<IFormData>();
	const dispatch = useAppDispatch();
	const onSubmitForm: SubmitHandler<IFormData> = async (data:IFormData) => {
	  await dispatch(createProduct(data));
		reset();
		onClose();
	};

	return (
		<Flex width='80%' background={'skyblue'}  padding={2} borderRadius={'xl'}>
			<form onSubmit={handleSubmit(onSubmitForm)}>
				<FormControl isInvalid={!!errors.name}>
					<FormLabel htmlFor="name">Name:</FormLabel>
					<Input
						id="name"
						placeholder="Enter name"
						{...register('name', { required: 'Name is required' })}
					/>
					<FormErrorMessage>{errors.name?.message}</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={!!errors.imageUrl}>
					<FormLabel htmlFor="imageUrl">Image URL:</FormLabel>
					<Input
						id="imageUrl"
						placeholder="Enter image URL"
						{...register('imageUrl')}
					/>
					<FormErrorMessage>{errors.imageUrl?.message}</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={!!errors.count}>
					<FormLabel htmlFor="count">Count:</FormLabel>
					<Input
						id="count"
						type="number"
						placeholder="Enter count"
						{...register('count', { required: 'Count is required' })}
					/>
					<FormErrorMessage>{errors.count?.message}</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={!!errors.size}>
					<FormLabel htmlFor="size">Size:</FormLabel>
					<Flex>
						<InputGroup>
							<Input
								id="width"
								type="number"
								placeholder="Width"
								{...register('size.width')}
							/>
						</InputGroup>
						<InputGroup ml={2}>
							<Input
								id="height"
								type="number"
								placeholder="Height"
								{...register('size.height')}
							/>
						</InputGroup>
					</Flex>
					<FormErrorMessage>{errors.size?.message}</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={!!errors.weight}>
					<FormLabel htmlFor="weight">Weight:</FormLabel>
					<Input
						id="weight"
						placeholder="Enter weight"
						{...register('weight', { required: 'Weight is required' })}
					/>
					<FormErrorMessage>{errors.weight?.message}</FormErrorMessage>
				</FormControl>

				<Box display={'flex'} columnGap={10}>
					<Button type='submit' width={120} mt={4} colorScheme='blue'>
					Add
				</Button>
					<Button width={120} mt={4} colorScheme='red' onClick={onClose}>
						Cancel
					</Button></Box>

			</form>
		</Flex>
	);
};

export { ProductModal };
