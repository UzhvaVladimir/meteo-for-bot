import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly confuService: ConfigService) {
        super({
           jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
           ignoreExpiration: false,
           secretOrKey: confuService.get('secret_jwt')
        });
    }

    async validate(payload: any) {
        return{...payload.user}
    }
}