import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PASSWORD_HASHER } from '../../application/auth/password-hasher';
import { TOKEN_GENERATOR } from '../../application/auth/token-generator';
import { BcryptPasswordHasher } from './bcrypt-password-hasher';
import { JwtStrategy } from './jwt.strategy';
import { JwtTokenGenerator } from './jwt-token-generator';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'dev-secret'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN', '7d') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    BcryptPasswordHasher,
    JwtTokenGenerator,
    JwtStrategy,
    { provide: PASSWORD_HASHER, useExisting: BcryptPasswordHasher },
    { provide: TOKEN_GENERATOR, useExisting: JwtTokenGenerator },
  ],
  exports: [PASSWORD_HASHER, TOKEN_GENERATOR, PassportModule, JwtModule],
})
export class AuthInfrastructureModule {}
