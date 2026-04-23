import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // pega o token do header (authorization)
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') ?? 'secret', // pega a jwt_secret do .env
        });
    }

    async validate(payload: any){
        return { id: payload.sub, username: payload.username, role: payload.role};
        
    }
}