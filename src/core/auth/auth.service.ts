import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/common';
import { Repository } from 'typeorm';
import { BcryptService } from 'src/common/services/bcrypt.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly bcryptService: BcryptService,
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const userInfo = await this.userRepository.findOne({
        where: { email: loginDto.email, status: 'Active' },
        relations: ['userGroup'],
      });
      await this.validateUser(loginDto);
      delete userInfo.password;
      return Promise.resolve(userInfo);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async validateUser(loginDto: LoginDto): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: loginDto.email,
          status: 'Active',
        },
      });
      console.log(loginDto);
      const isPasswordMatched = await this.bcryptService.comparePassword(
        loginDto.password,
        user?.password,
      );

      if (!isPasswordMatched) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
