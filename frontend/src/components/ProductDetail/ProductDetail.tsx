import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Image,
	Input,
	InputGroup,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '@/hooks/hooks.ts';
import { deleteProduct, updateProduct } from '@/store/Slices/product.slice.ts';
import { CommentModal } from '@/components/CommentModal/CommentModal.tsx';

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


const ProductDetail: FC = () => {
	const { state } = useLocation();
	const product = state.product;
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

	const { handleSubmit, register, reset, formState: { errors } } = useForm<IFormData>();
	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
		try {
			await dispatch(updateProduct({ id: product.id, updatedProduct: data }));
			reset();
			setIsEditModalOpen(false);
		} catch (error) {
			console.error(error);
			throw new Error('Failed to update product');
		}
	};

	const handleDelete = async () => {
		try {
			await dispatch(deleteProduct(product.id));
			reset();
			setIsEditModalOpen(false);

		} catch (e: any) {
			console.log(e.message);
		}
	};

	const handleEdit = () => {
		setIsEditModalOpen(true);
	};

	const handleComment = () => {
		setIsCommentModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsEditModalOpen(false);
		setIsCommentModalOpen(false);
	};
	return (
		<>
			<Flex justifyContent={'center'} alignItems={'center'} marginTop={5}>
				<Box
					width='300px'
					padding='4'
					boxShadow='md'
					borderRadius='md'
					textAlign='center'
					background={'#cacaca'}
				>
					<Image
						src={product.imageUrl}
						alt={product.name}
						objectFit='cover'
						borderRadius={'lg'}

					/>

					<Text fontSize='xl' fontWeight='bold'>{product.name}</Text>

					{product.size && (
						<Text fontSize='sm'>
							Size: {product.size.width}x{product.size.height}
						</Text>
					)}

					<Text fontSize='sm'>Weight: {product.weight}g</Text>
					<Text as={'span'} fontSize='x-large' color='mediumpurple' marginTop='2'>
						Price: {product.count}$
					</Text>

					<Flex justifyContent='space-around' marginTop='5' columnGap={10}>
						<Button
							onClick={handleEdit}
							width={'auto'}
							fontSize={'md'}
							rounded={'full'}
							bg={'blue.400'}
							color={'white'}
							boxShadow={
								'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
							}
							_hover={{
								bg: 'blue.500'
							}}
							_focus={{
								bg: 'blue.500'
							}}>
							Edit
						</Button>
						<Button
							onClick={handleComment}
							width={'auto'}
							fontSize={'md'}
							rounded={'full'}
							bg={'green.400'}
							color={'white'}
							boxShadow={
								'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
							}
							_hover={{
								bg: 'green.500'
							}}
							_focus={{
								bg: 'green.500'
							}}>
							Comments
						</Button>
					</Flex>
				</Box>
				<Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Edit Product</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<form>
								<FormControl isInvalid={!!errors.name}>
									<FormLabel htmlFor='name'>Name:</FormLabel>
									<Input
										id='name'
										placeholder='Enter name'
										{...register('name', { required: 'Name is required' })}
									/>
									<FormErrorMessage>{errors.name?.message}</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={!!errors.imageUrl}>
									<FormLabel htmlFor='imageUrl'>Image URL:</FormLabel>
									<Input
										id='imageUrl'
										placeholder='Enter image URL'
										{...register('imageUrl')}
									/>
									<FormErrorMessage>{errors.imageUrl?.message}</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={!!errors.count}>
									<FormLabel htmlFor='count'>Count:</FormLabel>
									<Input
										id='count'
										type='number'
										placeholder='Enter count'
										{...register('count', { required: 'Count is required' })}
									/>
									<FormErrorMessage>{errors.count?.message}</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={!!errors.size}>
									<FormLabel htmlFor='size'>Size:</FormLabel>
									<Flex>
										<InputGroup>
											<Input
												id='width'
												type='number'
												placeholder='Width'
												{...register('size.width')}
											/>
										</InputGroup>
										<InputGroup ml={2}>
											<Input
												id='height'
												type='number'
												placeholder='Height'
												{...register('size.height')}
											/>
										</InputGroup>
									</Flex>
									<FormErrorMessage>{errors.size?.message}</FormErrorMessage>
								</FormControl>

								<FormControl isInvalid={!!errors.weight}>
									<FormLabel htmlFor='weight'>Weight:</FormLabel>
									<Input
										id='weight'
										placeholder='Enter weight'
										{...register('weight', { required: 'Weight is required' })}
									/>
									<FormErrorMessage>{errors.weight?.message}</FormErrorMessage>
								</FormControl>
							</form>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme='blue' mr={3} onClick={handleSubmit(onSubmit)}>
								Update
							</Button>
							<Button variant='ghost' onClick={handleDelete}>
								delete
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
				{isCommentModalOpen && (
					<CommentModal onClose={handleCloseModal} productId={product.id} />
				)}
			</Flex>
		</>
	);
};

export { ProductDetail };