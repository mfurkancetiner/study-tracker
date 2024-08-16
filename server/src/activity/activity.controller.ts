import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Headers, Req } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  create(@Body() createActivityDto: Prisma.ActivityCreateInput, @Req() req: Request) {
    return this.activityService.create(createActivityDto, req);
  }

  @Get()
  findAll( @Req() req: Request, @Query('fn') finishDate?: Date ) {
    return this.activityService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.activityService.findOne(+id, req);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityDto: Prisma.ActivityUpdateInput, @Req() req: Request) {
    return this.activityService.update(+id, updateActivityDto, req);
  }

  @Patch(':id/stop')
  stopActivity(@Param('id') id: string, @Req() req: Request){
    return this.activityService.stopActivity(+id, req)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.activityService.remove(+id, req);
  }
}
