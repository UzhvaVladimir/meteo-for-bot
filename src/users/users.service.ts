import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/users.model";
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from "./dto";
import { AppError } from "../common/error";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

  async  hashPassword (password){
    return bcrypt.hash(password, 10)
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: {email}});
  }

  async  findUserByUserName(username: string) {
    return this.userRepository.findOne({ where: {username}});
  }
  async createUser(dto: CreateUserDTO){
    const existEmail = await this.findUserByEmail(dto.email);
    if (existEmail) throw new BadRequestException(AppError.MAIL_EXIST);

    const existUserName = await this.findUserByUserName(dto.username);
    if (existUserName) throw new BadRequestException(AppError.USER_EXIST);

    dto.password = await this.hashPassword(dto.password)
    await this.userRepository.create({
      username: dto.username,
      email: dto.email,
      password: dto.password
    })
    return dto
  }
}
