import { IsInt, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCommentDto {
	public productId: number;

	@IsString()
	public description: string;

	@Transform(({ value }) => new Date(value))
	public date: Date;
}
