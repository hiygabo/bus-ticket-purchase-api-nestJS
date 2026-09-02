import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      throw new BadRequestException('This email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password as string, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword as string,
    });

    return this.userRepository.save(newUser);
  }
  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
