import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/common';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { BcryptService } from 'src/common/services/bcrypt.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly bcryptService: BcryptService,
        @InjectRepository(UsersEntity)
        private readonly usersEntityRepository: Repository<UsersEntity>
    ){}

    create = async (dto:UserDto): Promise<any> => {
        try {
            dto.password = await this.bcryptService.hashPassword(dto.password);
            const create = this.usersEntityRepository.create(dto);
            await this.usersEntityRepository.save(create);
            return create;
        } catch (error) {
            throw new HttpException(error,HttpStatus.BAD_REQUEST);
        }
    }
}
