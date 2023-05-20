import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CommentEntity } from './entity/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
	constructor(@InjectRepository(CommentEntity) private readonly commentRepository: Repository<CommentEntity>) {}

	async getAll(): Promise<CommentEntity[]> {
		try {
			return await this.commentRepository.find();
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async getById(id: string): Promise<CommentEntity> {
		try {
			return await this.commentRepository.findOne({
				where: { id: Number(id) }
			});
		} catch (e) {
			throw new HttpException('This comment not found', HttpStatus.NOT_FOUND);
		}
	}

	async createComment(dto: CreateCommentDto): Promise<CommentEntity> {
		try {
			const comment = this.commentRepository.create(dto);
			return await this.commentRepository.save(comment);
		} catch (e) {
			throw new HttpException(`Comment could not be created: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateComment(id: string, dto: UpdateCommentDto): Promise<CommentEntity> {
		try {
			const comment = await this.getById(id);
			const updatedComment = { ...comment, ...dto };
			await this.commentRepository.update(id, updatedComment);
			return this.getById(id);
		} catch (e) {
			throw new HttpException(`This comment could not be updated: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async deleteComment(id: string): Promise<DeleteResult> {
		try {
			const comment = await this.getById(id);
			return this.commentRepository.delete(comment);
		} catch (e) {
			throw new HttpException(`The comment haven't been deleted ${e.message}`, HttpStatus.BAD_REQUEST);
		}
	}
}
