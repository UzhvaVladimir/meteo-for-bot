import {BadRequestException, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {CreateUserDTO} from "../users/dto";
import {AppError} from "../common/error";
import {UserLoginDto} from "./dto";
import * as bcrypt from 'bcrypt';
import {AuthUserResponse} from "./response";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    async registerUsers (dto: CreateUserDTO): Promise<CreateUserDTO> {

        const existEmail = await this.userService.findUserByEmail(dto.email);
        if (existEmail) throw new BadRequestException(AppError.MAIL_EXIST);

        const existUserName = await this.userService.findUserByUserName(dto.username);
        if (existUserName) throw new BadRequestException(AppError.USER_EXIST);
        return this.userService.createUser(dto);
    }

    async  loginUser(dto: UserLoginDto):Promise<AuthUserResponse> {
        const exitUser = await this.userService.findUserByEmail(dto.email);
        if (!exitUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
        const validatePassword = await bcrypt.compare(dto.password, exitUser.password);
        if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
        return exitUser
    }
}
