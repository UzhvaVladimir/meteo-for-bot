import {Body, Controller, Delete, Patch, Req, UseGuards} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDTO} from "./dto";
import {JwtAuthGuard} from "../guards/jwt-guards";

@Controller('users')
export class UsersController {
  constructor (private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateDto: UpdateUserDTO, @Req() request){
    const user = request.user
    return this.userService.updateUser(user.email, updateDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request) {
    const user = request.user
    return this.userService.deleteUser(user.email)
  }
}
