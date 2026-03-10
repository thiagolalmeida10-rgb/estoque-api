import { Module } from '@nestjs/common';
import { MovimentacoesController } from './movimentacoes.controller';
import { MovimentacoesService } from './movimentacoes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimentacao } from './movimentacao.entity';
import { Produto } from 'src/produtos/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movimentacao, Produto])],
  controllers: [MovimentacoesController],
  providers: [MovimentacoesService]
})
export class MovimentacoesModule {}
