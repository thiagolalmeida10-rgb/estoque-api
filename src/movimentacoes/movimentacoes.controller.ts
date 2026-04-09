import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MovimentacoesService } from './movimentacoes.service';
import { CreateMovimentacaoDto } from './dto/CreateMovimentacaoDto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('movimentacoes')
export class MovimentacoesController {

    constructor(private readonly movimentacoesService: MovimentacoesService)
    {}


    @Post()
    criar(@Body() dto: CreateMovimentacaoDto){
        console.log("DTO", dto)
        return this.movimentacoesService.registrar(dto)
    }
    @Get()
    listar(){
       return this.movimentacoesService.listar()
    }
}
