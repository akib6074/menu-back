import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "./custom-base.entity";
import { UserGroupsEntity } from "./user-groups.entity";

@Entity({name:'users'})
export class UsersEntity extends CustomBaseEntity{
    @Column({name: 'name', type: 'varchar', nullable: false})
    name: string;

    @Column({name: 'email', type: 'varchar', nullable: false})
    email: string;

    @Column({name: 'password', type: 'varchar', nullable: false})
    password: string;

    @ManyToOne(()=>UserGroupsEntity, userGroupsEntity=>userGroupsEntity)
    @JoinColumn({name: 'user_group_id'})
    userGroup: UserGroupsEntity;
}