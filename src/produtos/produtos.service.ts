import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './produto.entity';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/CreateProdutoDTO';

@Injectable()
export class ProdutosService {

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ){}

    criar(dto: CreateProdutoDto){
        const produto = this.produtoRepository.create(dto)
        return this.produtoRepository.save(produto)
    }

    listar(){
        return this.produtoRepository.find()
    }

    buscarPorId(id: number){
        return this.produtoRepository.findOneBy({id})
    }

    remover(id: number){
        return this.produtoRepository.delete({id})
    }


}
