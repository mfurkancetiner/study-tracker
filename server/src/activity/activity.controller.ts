import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Prisma } from '@prisma/client';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  create(@Body() createActivityDto: Prisma.ActivityCreateInput) {
    return this.activityService.create(createActivityDto);
  }

  @Get()
  findAll(@Query('c') category?: string, @Query('st') startDate?: Date, @Query('fn') finishDate?: Date ) {
    return this.activityService.findAll(category, startDate, finishDate);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityDto: Prisma.ActivityUpdateInput) {
    return this.activityService.update(+id, updateActivityDto);
  }

  @Patch(':id/stop')
  stopActivity(@Param('id') id: string){
    return this.activityService.stopActivity(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(+id);
  }
}
