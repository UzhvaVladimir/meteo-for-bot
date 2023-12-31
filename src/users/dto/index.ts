import { IsString } from 'class-validator';

export class CreateUserDTO{

  @IsString()
  username: string

  @IsString()
  email: string

  @IsString()
  password: string
}

export class UpdateUserDTO{
  @IsString()
  username: string

  @IsString()
  email: string

  @IsString()
  password: string
}