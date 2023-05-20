import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { CommentService } from './comment.service';

import { CommentEntity } from './entity/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@ApiResponse({ status: 200, type: [CommentEntity] })
	@Get()
	async getAll() {
		return this.commentService.getAll();
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.commentService.getById(id);
	}

	@HttpCode(HttpStatus.CREATED)
	@ApiResponse({ status: 200, type: [CommentEntity] })
	@Post()
	async createComment(@Body() dto: CreateCommentDto) {
		return this.commentService.createComment(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async updateComment(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
		return this.commentService.updateComment(id, dto);
	}

	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async deleteComment(@Param('id') id: string): Promise<DeleteResult> {
		return this.commentService.deleteComment(id);
	}
}
