import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { CustomBaseEntity } from "./custom-base.entity";

@Entity({name:'system_tasks'})
export class SystemTasksEntity extends CustomBaseEntity{
    
    @Column({name:'name_en', type:'varchar', nullable: false, unique: true})
    name_en: string;

    @Column({name:'type',type:'varchar',  nullable: false, default: 'TASK'})
    type: string;

    @Column({name:'controller',type:'varchar',  nullable: false, default:'test'})
    controller: string;

    @Column({name:'ordering', type:'smallint', nullable: false, default: 9999 })
    ordering: number;

    @ManyToOne(() => SystemTasksEntity, (systemTasksEntity) => systemTasksEntity.children)
	parent: SystemTasksEntity;

	@OneToMany(() => SystemTasksEntity, (systemTasksEntity) => systemTasksEntity.parent)
	children: SystemTasksEntity[];
}