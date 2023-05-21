import { FC, useEffect } from 'react';
import moment from 'moment';
import {
	Box,
	Button, HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks.ts';
import { getCommentById } from '@/store/Slices/comment.slice.ts';


interface ICommentModalProps {
	onClose: () => void;
	productId: number;
}

const CommentModal: FC<ICommentModalProps> = ({ onClose ,productId }) => {
	const dispatch = useAppDispatch();
	const {comments}  = useAppSelector(state => state.commentReducer);
	console.log(comments);

	useEffect( () => {
		 dispatch(getCommentById(productId));
	}, [dispatch, productId]);



	return (
		<Modal isOpen={true} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Comment:</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{comments.length > 0 ? (
						comments.map((comment, index) => (
							<Box key={index} mb={4}>
								<Text as={'h2'} mb={5}>Description:</Text>
								<Text as={'li'} mb={3}>{comment.description}</Text>
								<Text fontSize={'sm'} fontWeight={'bold'} as={'span'}>Date: {moment(comment.date).format('HH:mm DD.MM.YYYY')}</Text>
							</Box>
						))
					) : (
						<Text as={'p'}>
							No description available in English for this product.
						</Text>
					)}
				</ModalBody>
				<ModalFooter>
					<HStack><Button size={'sm'} colorScheme={'orange'} onClick={onClose}>
						Close
					</Button>

						<Button size={'sm'} colorScheme={'whatsapp'}>
							Change
						</Button></HStack>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
export { CommentModal };