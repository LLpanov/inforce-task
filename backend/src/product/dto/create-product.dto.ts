import { IsArray, IsInt, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCommentDto } from '../../comment/dto/create-comment.dto';

class SizeDto {
	@IsInt()
	public width: number;

	@IsInt()
	public height: number;
}

export class CreateProductDto {
	@IsString()
	public imageUrl: string;

	@IsString()
	public name: string;

	@IsInt()
	public count: number;

	@IsObject()
	@ValidateNested()
	@Type(() => SizeDto)
	public size: SizeDto;

	@IsString()
	public weight: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateCommentDto)
	public comments: CreateCommentDto[];
}
