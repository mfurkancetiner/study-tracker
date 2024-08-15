import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'


@Injectable()
export class UserService {

  constructor(private readonly databaseService: DatabaseService) { }

  async isEmailUnique(email: string){
    const user = await this.databaseService.user.findUnique({
      where:{
        email: email
      }
    })
    //If user with email not found, return true as in yes it is unique
    if(!user)
      return true
    return false
  }

  isEmailValid(email: string){
    const emailPattern =  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    if(emailPattern.test(email))
      return true
    return false
  }

  createJWT(id:number, email: string){
    return jwt.sign({
      userId: id,
      email: email},
      "jwtSecret", 
      {
        expiresIn: '30d'        
      })
  }

  async register(createUserDto: Prisma.UserCreateInput) {
    if(!this.isEmailValid(createUserDto.email))
      throw new BadRequestException('Invalid Email')
    else if(!this.isEmailUnique(createUserDto.email))
      throw new BadRequestException('User with this email already exists')
    else if(createUserDto.password.length <= 5)
      throw new BadRequestException('Password too short, must be atleast 6 characters')
    else if(createUserDto.username.length <= 2)
      throw new BadRequestException('Username too short')

    const saltRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltRounds);
    createUserDto.password = hash
    
    const user = await this.databaseService.user.create({
        data: createUserDto
      })

    const token = this.createJWT(user.id, user.email)
    return({
      user, token 
    })
    
  }

  async login(updateUserDto: Prisma.UserCreateInput){
    const userEmail = updateUserDto.email
    const user = await this.databaseService.user.findUnique({
      where:{
        email: userEmail
      }
    })

    if(!user)
      throw new NotFoundException(`No user found with email ${userEmail}`) 

    const isMatch = await bcrypt.compare(updateUserDto.password, user.password);
    if(!isMatch){
      throw new UnauthorizedException('Password invalid')
    }

    const token = this.createJWT(user.id, user.email)

    return({
      user, token
    })

  }

  async findAll() {
    return await this.databaseService.user.findMany({
      where:{}
    })
  }

  async findOne(id?: number) {
    const user = await this.databaseService.user.findUnique({
      where:{
        id:id
      }
    })
    if(!user){
      throw new NotFoundException(`User with id ${id} not found.`)
    }
    return user
  }

  async updateEmail(id: number, email: string) {
    const user = await this.findOne(id)
    if(!user){
      throw new NotFoundException(`User with id ${id} not found.`)
    }
    if(this.isEmailValid(email) && this.isEmailUnique(email)){
      const user = await this.databaseService.user.update({
        where:{
          id:id
        },
        data: {
          email: email
        }
      })
    }
    return user
  }

  async updatePassword(id: number, password: string) {
    const user = await this.findOne(id)
    if(!user){
      throw new NotFoundException(`User with id ${id} not found.`)
    }
    if(password.length <= 5)
      throw new BadRequestException('Password too short, must be atleast 6 characters')
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    password = hash
    const updated = await this.databaseService.user.update({
      where: {id},
      data:{
        password
      }
    })
    return updated
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    if(!user){
      throw new NotFoundException(`User with id ${id} not found.`)
    }
    const deleted = await this.databaseService.user.delete({
      where:{
        id
      }
    })
    return(deleted)
  }
}
