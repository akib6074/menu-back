import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './custom-base.entity';

@Entity({ name: 'user_gorups' })
export class UserGroupsEntity extends CustomBaseEntity {

  @Column({ name: 'name', type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ name: 'ordering', type: 'smallint', nullable: false, unique: true })
  ordering: number;

  @Column({ name: 'action_0', type: 'varchar', nullable: false, unique: false })
  action_0: string;

  @Column({ name: 'action_1', type: 'varchar', nullable: false, unique: false })
  action_1: string;

  @Column({ name: 'action_2', type: 'varchar', nullable: false, unique: false })
  action_2: string;

  @Column({ name: 'action_3', type: 'varchar', nullable: false, unique: false })
  action_3: string;

  @Column({ name: 'action_4', type: 'varchar', nullable: false, unique: false })
  action_4: string;

  @Column({ name: 'action_5', type: 'varchar', nullable: false, unique: false })
  action_5: string;

  @Column({ name: 'action_6', type: 'varchar', nullable: false, unique: false })
  action_6: string;

  @Column({ name: 'action_7', type: 'varchar', nullable: false, unique: false })
  action_7: string;
  
  @Column({ name: 'action_8', type: 'varchar', nullable: false, unique: false })
  action_8: string;
}
// "CREATE TABLE `user_groups` (
//     `id` bigint UNSIGNED NOT NULL,
//     `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
//     `status` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Active',
//     `ordering` smallint NOT NULL DEFAULT '99',
//     `created_at` timestamp NULL DEFAULT NULL,
//     `updated_at` timestamp NULL DEFAULT NULL,
//     `created_by` int DEFAULT NULL,
//     `updated_by` int DEFAULT NULL,
//     `action_0` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ',',
//     `action_1` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ',',
//     `action_2` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ',',
//     `action_3` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ',',
//     `action_4` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ',',
//     `action_5` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ',',
//     `action_6` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ',',
//     `action_7` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ',',
//     `action_8` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ','
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"
