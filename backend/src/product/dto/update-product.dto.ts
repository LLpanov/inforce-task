import { IsInt, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SizeDto {
	@IsInt()
	public width?: number;

	@IsInt()
	public height?: number;
}

export class UpdateProductDto {
	@IsString()
	public imageUrl?: string;

	@IsString()
	public name?: string;

	@IsInt()
	public count?: number;

	@IsObject()
	@ValidateNested()
	@Type(() => SizeDto)
	public size?: SizeDto;

	@IsString()
	public weight?: string;
}
