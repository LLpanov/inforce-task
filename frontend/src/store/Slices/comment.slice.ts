import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { commentService } from '@/services/comment.service.ts';
import { IComment } from '@/interfaces/comment.interface.ts';

interface CommentState {
	comments: IComment[];
	selectedComment: IComment | null;
	loading: boolean;
	error: string | null;
}

const initialState: CommentState = {
	comments: [],
	selectedComment: null,
	loading: false,
	error: null
};


export const getCommentById = createAsyncThunk('comment/getCommentById', async (id: number) => {
	try {
		return await commentService.getById(id);
	} catch (error) {
		throw new Error('Failed to fetch comment');
	}
});

export const createComment = createAsyncThunk('comment/createComment', async (comment: IComment) => {
	try {
		return await commentService.createComment(comment);
	} catch (error) {
		throw new Error('Failed to create comment');
	}
});

export const updateComment = createAsyncThunk('comment/updateComment', async (comment: IComment) => {
	try {
		return await commentService.updateComment(comment.id, comment);
	} catch (error) {
		throw new Error('Failed to update comment');
	}
});

export const deleteComment = createAsyncThunk('comment/deleteComment', async (id: number) => {
	try {
		await commentService.deleteComment(id);
		return id;
	} catch (error) {
		throw new Error('Failed to delete comment');
	}
});

const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCommentById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getCommentById.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedComment = action.payload;
			})
			.addCase(getCommentById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch comment';
			})
			.addCase(createComment.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createComment.fulfilled, (state, action) => {
				state.loading = false;
				state.comments.push(action.payload);
			})
			.addCase(createComment.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to create comment';
			})
			.addCase(updateComment.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateComment.fulfilled, (state, action) => {
				state.loading = false;
				const updatedComment = action.payload;
				const index = state.comments.findIndex((comment) => comment.id === updatedComment.id);
				if (index !== -1) {
					state.comments[index] = { ...state.comments[index], ...updatedComment };
				}
			})
			.addCase(updateComment.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to update comment';
			})
			.addCase(deleteComment.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteComment.fulfilled, (state, action) => {
				state.loading = false;
				const deletedCommentId = action.payload;
				state.comments = state.comments.filter((c) => c.id !== deletedCommentId);
			})
			.addCase(deleteComment.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to delete comment';
			});
	}
});
const commentReducer = commentSlice.reducer;
export { commentReducer };

