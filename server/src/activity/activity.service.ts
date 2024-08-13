import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ActivityService {

  constructor(private readonly databaseService: DatabaseService) { }

  async create(createActivityDto: Prisma.ActivityCreateInput) {
    return this.databaseService.activity.create({
      data: createActivityDto
    })
  }

  async findAll(category?: string, startDate?: Date, finishDate?: Date) {
    const where: any = {

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


  async findOne(id: number) {
    const activity = await this.databaseService.activity.findUnique({
      where: {
        id: id
      }
    })
    if(!activity)
      throw new NotFoundException(`Activity with id ${id} not found`)
    return activity

  }

  async update(id: number, updateActivityDto: Prisma.ActivityUpdateInput) {
    const activity = await this.databaseService.activity.update({
      where: {
        id: id,
      },
      data: updateActivityDto,
    })
    return activity
  }

  async stopActivity(id: number){
    let activity = await this.databaseService.activity.findUnique({where: {id}})
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

  async remove(id: number) {
    const activity = await this.databaseService.activity.delete({
      where: {
        id: id,
      }
    })
    
    return activity
  }
}
