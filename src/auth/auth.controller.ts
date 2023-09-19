import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDTO} from "../users/dto";
import {UserLoginDto} from "./dto";
import {JwtAuthGuard} from "../guards/jwt-guards";
import {AuthUserResponse} from "./response";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    register (@Body() dto: CreateUserDTO): Promise<CreateUserDTO>{
        return this.authService.registerUsers(dto)
    }

    @Post('login')
    login (@Body() dto: UserLoginDto): Promise<AuthUserResponse> {
        return this.authService.loginUser(dto);
    }
    @UseGuards(JwtAuthGuard)
    @Post('test')
    test () {
        return true
    }
}
