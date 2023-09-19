import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/users.model";
import * as bcrypt from 'bcrypt';
import {CreateUserDTO, UpdateUserDTO} from "./dto";
import { AppError } from "../common/error";
import {WatchList} from "../watchlist/models/watchlist.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

  async  hashPassword (password: string): Promise<string>{
    try {
      return bcrypt.hash(password, 10)
    }catch (e) {
      throw new Error(e)
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.userRepository.findOne({ where: {email},
      include:{
        model: WatchList,
        required: false
      }});
    }catch (e) {
      throw new Error(e)
    }
  }

  async  findUserByUserName(username: string): Promise<User> {
    try{
      return this.userRepository.findOne({ where: {username}});
    }catch (e) {
      throw Error(e)
    }

  }
  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO>{
    try {
      dto.password = await this.hashPassword(dto.password)
      await this.userRepository.create({
        username: dto.username,
        email: dto.email,
        password: dto.password
      })
      return dto
    }catch (e) {
      throw new Error(e)
    }
  }
  async publicUser(email: string): Promise<User>{
    try {
      return this.userRepository.findOne({
        where: {email},
        attributes: {exclude: ['password']},
        include: {
          model: WatchList,
          required: false
        }
      })
    }catch (e) {
      throw new Error(e)
    }
  }
  async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    try {
      await this.userRepository.update(dto, {where: {email}})
      return dto
    }catch (e){
      throw new Error(e)
    }
  }

  async deleteUser(email: string): Promise<boolean> {
    try {
      await this.userRepository.destroy({where: {email}})
      return true
    }catch (e) {
      throw new Error(e)
    }
  }
}
