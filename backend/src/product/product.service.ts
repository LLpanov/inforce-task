import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entity/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
	constructor(@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>) {}

	async getAll(): Promise<ProductEntity[]> {
		try {
			return await this.productRepository.find({ relations: ['comments'] });
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}

	async getById(id: string): Promise<ProductEntity> {
		try {
			return await this.productRepository.findOne({
				where: { id: Number(id) }
			});
		} catch (e) {
			throw new HttpException('This product not found', HttpStatus.NOT_FOUND);
		}
	}

	async createProduct(dto: CreateProductDto): Promise<ProductEntity> {
		try {
			const product = this.productRepository.create(dto);
			return this.productRepository.save(product);
		} catch (e) {
			throw new HttpException(`Product could not be created: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateProduct(id: string, dto: UpdateProductDto): Promise<ProductEntity> {
		try {
			const product = await this.getById(id);
			const updatedProduct = { ...product, ...dto };
			await this.productRepository.update(id, updatedProduct);
			return this.getById(id);
		} catch (e) {
			throw new HttpException(`This product could not be updated: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async deleteProduct(id: string): Promise<DeleteResult> {
		try {
			const product = await this.getById(id);
			console.log(product);
			return this.productRepository.delete(product);
		} catch (e) {
			throw new HttpException(`The product haven't been deleted ${e.message}`, HttpStatus.BAD_REQUEST);
		}
	}
}
