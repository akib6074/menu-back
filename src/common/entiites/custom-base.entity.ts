import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';

export class CustomBaseEntity extends BaseEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({
		type: "datetime",
		name: "created_at",
		nullable: true,
	})
	createdAt: Date | null;

	@Column({
		type: "datetime",
		name: "updated_at",
		nullable: true,
	})
	updatedAt: Date | null;

	@Column({name:'status', type:'varchar', nullable: false, default: 'Active'})
	status: string;
}
