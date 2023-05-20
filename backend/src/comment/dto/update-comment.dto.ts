import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCommentDto {
	@IsString()
	public description: string;

	@Transform(({ value }) => new Date(value))
	public date: Date;
}
