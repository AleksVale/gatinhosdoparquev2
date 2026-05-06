import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ApplicationModule } from '../../application/application.module';
import { AdoptionsController } from './controllers/adoptions.controller';
import { AuthController } from './controllers/auth.controller';
import { CatsController } from './controllers/cats.controller';
import { UsersController } from './controllers/users.controller';
import { ApplicationExceptionFilter } from './filters/application-exception.filter';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [ApplicationModule],
  controllers: [AuthController, CatsController, UsersController, AdoptionsController],
  providers: [JwtAuthGuard, RolesGuard, { provide: APP_FILTER, useClass: ApplicationExceptionFilter }],
})
export class HttpModule {}
