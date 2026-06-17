import { Module } from '@nestjs/common';
import { ApplicationModule } from './modules/application/applications.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, ApplicationModule],
})
export class AppModule { }
