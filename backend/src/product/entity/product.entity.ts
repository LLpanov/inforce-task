import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CommentEntity } from '../../comment/entity/comment.entity';

@Entity({ name: 'product' })
export class ProductEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	imageUrl: string;

	@Column()
	name: string;

	@Column()
	count: number;

	@Column('jsonb', { nullable: true })
	size: { width: number; height: number };

	@Column()
	weight: string;

	@OneToMany(() => CommentEntity, comment => comment.product, { cascade: true })
	@JoinColumn({ name: 'productId' })
	comments: CommentEntity[];
}
