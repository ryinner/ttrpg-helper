import { AuthConfig } from '@/config/auth.config';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<AuthConfig>('auth').jwt.secret,
    });
  }

  async validate({ id }: { id: number }) {
    // clients service
    const client = this.prismaService.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new UnauthorizedException();
    }

    return client;
  }
}
