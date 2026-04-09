import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUsuarioDto } from "./dto/CreateUsuario.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('register')
    register(@Body() dto: CreateUsuarioDto){
        return this.authService.register(dto)
    }

    @Post('login')
    login(@Body() dto: CreateUsuarioDto){
        return this.authService.login(dto.email, dto.senha)
    }
}