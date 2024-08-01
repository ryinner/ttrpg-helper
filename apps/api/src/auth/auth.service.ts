import { PrismaService } from '@/prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  public async signIn({ username, password }: SignInDto) {
    const user = await this.prisma.client.findUnique({
      select: {
        id: true,
        username: true,
        password: true,
      },
      where: {
        username,
      },
    });

    if (!user) {
      throw new NotFoundException(`No clients for ${username}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
      }),
    };
  }
}
