import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    const secretOrKey = process.env.JWT_SECRET;

    if (!secretOrKey) {
      throw new Error("JWT_SECRET não está definido nas variáveis de ambiente");
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey,
    });
  }

  async validate(payload: { sub: User["id"]; name: string }) {
    const user = await this.userService.findUserById(payload.sub);
    if (!user) throw new UnauthorizedException("Usuário não autorizado");
    return user;
  }
}
