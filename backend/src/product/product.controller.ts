import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { DeleteResult } from 'typeorm';

import { ProductEntity } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Products')
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@ApiResponse({ status: 200, type: [ProductEntity] })
	@Get()
	async getAll() {
		return this.productService.getAll();
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		console.log(id);
		return this.productService.getById(id);
	}

	@HttpCode(HttpStatus.CREATED)
	@ApiResponse({ status: 200, type: [ProductEntity] })
	@Post('/admin')
	async createProduct(@Body() dto: CreateProductDto) {
		return this.productService.createProduct(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Put('/admin/:id')
	async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
		return this.productService.updateProduct(id, dto);
	}

	@HttpCode(HttpStatus.OK)
	@Delete('/admin/:id')
	async deleteProduct(@Param('id') id: string): Promise<DeleteResult> {
		return this.productService.deleteProduct(id);
	}
}
