import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { IsEmail } from 'class-validator';

@Injectable()
export class UserService {

  constructor(private readonly databaseService: DatabaseService) { }

  async create(createUserDto: Prisma.UserCreateInput) {
    const emailPattern =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    if(emailPattern.test(createUserDto.email)){
      return this.databaseService.user.create({
        data: createUserDto
      })
    }
    else{
      throw new BadRequestException('Invalid Email')
    }
  }

  async findAll() {
    return this.databaseService.user.findMany({
      where:{}
    })
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where:{
        id:id
      }
    })
    if(!user){
      throw new NotFoundException(`User with id ${id} not found.`)
    }
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    const user = await this.databaseService.user.update({
      where:{
        id:id
      },
      data: updateUserDto
    })
    if(!user){
      throw new NotFoundException(`User with id ${id} not found.`)
    }
  }

  async remove(id: number) {
    const user = await this.databaseService.user.delete({
      where:{
        id:id
      }
    })
    if(!user){
      throw new NotFoundException(`User with id ${id} not found.`)
    }
  }
}
