import { Injectable, NotFoundException, Scope } from '@nestjs/common';
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

  async findAll(req: Request, category?: string, startDate?: Date, finishDate?: Date) {
    const where: any = {
      createdById: req.user.userId
    }
    if(category){
      where.category = category
    }
    if(startDate){
      where.startedAt = { gte: startDate } 
    }
    if(finishDate){
      where.finishedAt = { lte: finishDate } 
    }
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
    const activity = await this.databaseService.activity.update({
      where: {
        id: id,
        createdById: req.user.userId
      },
      data: updateActivityDto,
    })
    return activity
  }

  async stopActivity(id: number, req: Request){
    
    let activity = await this.findOne(id, req)
    const minsSinceStart = Math.ceil((new Date().getTime() - new Date(activity.startedAt).getTime()) / 60000)
    const data: any = { finishedAt: new Date(), durationWithOvertime: minsSinceStart }
    if(activity){
      data.successful = Math.ceil((new Date(data.finishedAt).getTime() - new Date(activity.startedAt).getTime()) / 60000) > activity.duration ? true : false
    }
    else{
      throw new NotFoundException(`Activity with id ${id} not found`)
    }

    activity = await this.databaseService.activity.update({
      where: {id},
      data: data
    })

    return activity

  }

  async remove(id: number, req: Request) {
    try{
      const activity = await this.databaseService.activity.delete({
        where: {
          id: id,
          createdById: req.user.userId
        }
      })
      return(activity)
    }
    catch(error){
      throw new NotFoundException(`Activity with id ${id} not found`)
    }
  }
}
