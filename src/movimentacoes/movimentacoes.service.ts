    import { Injectable } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Movimentacao } from './movimentacao.entity';
    import { Produto } from 'src/produtos/produto.entity';
    import { Repository } from 'typeorm';
    import { CreateMovimentacaoDto } from './dto/CreateMovimentacaoDto';

    @Injectable()
    export class MovimentacoesService {

        constructor(
        @InjectRepository(Movimentacao)
        private movRepository: Repository<Movimentacao>,

        @InjectRepository(Produto)
        private produtosRepository: Repository<Produto>
        ){}

        async registrar(dto: CreateMovimentacaoDto){

            const produto = await this.produtosRepository.findOneBy({
                id: dto.produtoId,
            })

            if(!produto){
                throw new Error("Produto não encontrado.")
            }

            if(dto.tipo === "ENTRADA"){
                produto.estoque += dto.quantidade;
            }

            if(dto.tipo === "SAIDA"){

                if(dto.quantidade > produto.estoque){
                    throw new Error("Estoque insuficiente")
                }

                produto.estoque -= dto.quantidade
            }

            await this.produtosRepository.save(produto)

            const movimentacao = this.movRepository.create({
                tipo: dto.tipo,
                quantidade: dto.quantidade,
                data: new Date(),
                produto,
            })
            return this.movRepository.save(movimentacao)
        }

        listar(){
            return this.movRepository.find({
                relations: ['produto']
            })
        }
    }