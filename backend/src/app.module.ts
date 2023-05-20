import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';

import { ProductEntity } from './product/entity/product.entity';
import { CommentEntity } from './comment/entity/comment.entity';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('POSTGRES_HOST'),
				port: +configService.get<number>('POSTGRES_PORT'),
				username: configService.get('POSTGRES_USER'),
				password: configService.get('POSTGRES_PASSWORD'),
				database: configService.get('POSTGRES_DB'),
				entities: [ProductEntity, CommentEntity],
				synchronize: true
			})
		}),
		ProductModule,
		CommentModule
	]
})
export class AppModule {}
