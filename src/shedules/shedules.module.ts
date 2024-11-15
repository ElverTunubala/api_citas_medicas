import { Module } from '@nestjs/common';
import { ScheduleService } from './shedules.service';
import { ScheduleController } from './shedules.controller';
import { Schedule } from './entities/shedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ShedulesModule {}
