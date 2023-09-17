import {BadRequestException, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {CreateUserDTO} from "../users/dto";
import {AppError} from "../common/error";
import {UserLoginDto} from "./dto";
import * as bcrypt from 'bcrypt';
import {AuthUserResponse} from "./response";
import {TokenService} from "../token/token.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
                private readonly tokenService: TokenService) {}

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
        const token = await this.tokenService.generateJwtToken(dto.email);
        const user = await this.userService.publicUser(dto.email);
        return {...user, token}
    }
}
