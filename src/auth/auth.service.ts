import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "./usuario.entity";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from "./dto/CreateUsuario.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private jwtService: JwtService
    ){}

    async register(dto: CreateUsuarioDto){
        const existe = await this.usuarioRepository.findOneBy({email: dto.email})
        console.log("EXISTE:", existe)

        if(existe) throw new ConflictException("Email já cadastrado!")

        const hash = await bcrypt.hash(dto.senha, 10)
        const usuario = this.usuarioRepository.create({email: dto.email, senha: hash})
        console.log("USUARIO:", usuario)
        await this.usuarioRepository.save(usuario)
        return {messagem: 'Usuario criado com sucesso!'}
    }

    async login(email: string, senha: string){
        //Buscar o email do usuario e verificar se ta cero
        const usuario = await this.usuarioRepository.findOneBy({email})
        if(!usuario) throw new UnauthorizedException("Credenciais invalidas!")
        //Comparar a senha informada do usuario com a senha cadastrada no banco
        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if(!senhaValida) throw new UnauthorizedException("Credenciais invalidas")

        
        const payload = {sub: usuario.id, email: usuario.email}
        return{access_token: this.jwtService.sign(payload)}
    }
}