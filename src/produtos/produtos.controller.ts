import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/CreateProdutoDTO';

@Controller('produtos')
export class ProdutosController {

    constructor(private produtosService: ProdutosService){}

    @Post()
    criar(@Body() dto: CreateProdutoDto){
        return this.produtosService.criar(dto)
    }

    @Get('livros')
    listar(){
        return this.produtosService.listar()
    }

    @Get(':id')
    buscar(@Param('id') id: string){
        return this.produtosService.buscarPorId(Number(id))
    }

    @Get(':id')
    remover(@Param('id') id: string){
        return this.produtosService.remover(Number(id))
    }
}
