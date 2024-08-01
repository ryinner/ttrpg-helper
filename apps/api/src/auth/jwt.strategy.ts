import { ClientsService } from '@/clients/clients.service';
import { AuthConfig } from '@/config/auth.config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private clientService: ClientsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<AuthConfig>('auth').jwt.secret,
    });
  }

  async validate({ id }: { id: number }) {
    try {
      const client = this.clientService.findOne(id);
      return client;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
