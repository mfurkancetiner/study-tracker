import { BadRequestException, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { UserService } from 'src/auth/auth.service';


declare module 'express' {
  interface Request {
    user?: {
      userId: number;
      email: string
      // Add other properties if needed
    };
  }
}

@Injectable({ scope: Scope.REQUEST })
export class ActivityService {

  constructor(private readonly databaseService: DatabaseService, private readonly userService: UserService) { }

  async create(createActivityDto: Prisma.ActivityCreateInput, req: Request) {
    createActivityDto.createdBy = {
      connect: { id: req.user.userId }
    };
    return this.databaseService.activity.create({
      data: createActivityDto
    })
  }

  async findAll(req: Request, finishDate?: Date) {
    const where: any = {
      createdById: req.user.userId
    }
    if(!finishDate){
      finishDate = new Date("2100-01-01T12:10:30.318Z")
    }
    
    where.finishedAt = { lte: finishDate } 
    
    return this.databaseService.activity.findMany({
      where: where
    })
  }


  async findOne(id: number, req: Request) {
    const activity = await this.databaseService.activity.findUnique({
      where: {
        id: id,
        createdById: req.user.userId
      }
    })
    if(!activity)
      throw new NotFoundException(`Activity with id ${id} not found`)
    return activity
  }

  async update(id: number, updateActivityDto: Prisma.ActivityUpdateInput, req: Request) {
    const activity = await this.findOne(id, req)
    if(!activity)
      throw new NotFoundException(`Activity with id ${id} not found`)
    const updated = await this.databaseService.activity.update({
      where: {
        id: id,
        createdById: req.user.userId
      },
      data: updateActivityDto,
    })
    return updated
  }

  async stopActivity(id: number, req: Request){
    
    const activity = await this.findOne(id, req)
    if(!activity){
      throw new NotFoundException(`Activity with id ${id} not found`)
    }
    if(activity.finishedAt){
      throw new BadRequestException('Activity already stopped')
    }
    const minsSinceStart = Math.ceil((new Date().getTime() - new Date(activity.startedAt).getTime()) / 60000)
    const data: any = { finishedAt: new Date(), durationWithOvertime: minsSinceStart }
    data.successful = Math.ceil((new Date(data.finishedAt).getTime() - new Date(activity.startedAt).getTime()) / 60000) > activity.duration ? true : false

    const stopped = await this.databaseService.activity.update({
      where: {id},
      data: data
    })
    return stopped
  }

  async remove(id: number, req: Request) {
    const activity = await this.findOne(id, req)
    if(!activity)
      throw new NotFoundException(`Activity with id ${id} not found`)
   
      const deleted = await this.databaseService.activity.delete({
        where: {
          id: id,
          createdById: req.user.userId
        }
      })
      return(activity)
   
  }
}
