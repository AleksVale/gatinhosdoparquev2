import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenPayload, TokenGenerator } from '../../application/auth/token-generator';

@Injectable()
export class JwtTokenGenerator implements TokenGenerator {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: AuthTokenPayload): string {
    return this.jwtService.sign(payload);
  }
}
