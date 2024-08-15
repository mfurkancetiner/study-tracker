import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UserService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.register(createUserDto);
  }

  @Post('/login')
  async login(@Body() createUserDto: Prisma.UserCreateInput){
    return this.userService.login(createUserDto)
  } 

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('/updateEmail/:id')
  updateEmail(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.userService.updateEmail(+id, String(updateUserDto.email));
  }

  @Patch('/updatePassword/:id')
  updatePassword(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.userService.updatePassword(+id, String(updateUserDto.password));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
