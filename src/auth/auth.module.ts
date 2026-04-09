import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { Usuario } from "./usuario.entity";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario]),
        PassportModule,
        JwtModule.register({
            secret: "estoque_secret",
            signOptions: {expiresIn: '8h'}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}