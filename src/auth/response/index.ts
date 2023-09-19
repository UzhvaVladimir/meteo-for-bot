import {IsString} from "class-validator";
class UserResponse {
    @IsString()
    username: string

    @IsString()
    email: string

    @IsString()
    password: string
}
export class AuthUserResponse {
    user: UserResponse

    @IsString()
    token: string
}