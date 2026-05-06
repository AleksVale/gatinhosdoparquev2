import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticateUserUseCase } from '../../../application/auth/authenticate-user.use-case';
import { LoginDto } from '../dtos/auth/login.dto';

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user and get JWT token' })
  login(@Body() loginDto: LoginDto) {
    return this.authenticateUserUseCase.execute(loginDto.email, loginDto.password);
  }
}
