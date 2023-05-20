import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ProductEntity } from '../../product/entity/product.entity';

@Entity({ name: 'comment' })
export class CommentEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public description: string;

	@Column()
	productId: number;

	@UpdateDateColumn({ type: 'timestamp', precision: 0 })
	public date: Date;

	@ManyToOne(() => ProductEntity, product => product.comments)
	public product: ProductEntity;
}
