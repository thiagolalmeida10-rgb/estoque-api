import { Produto } from "src/produtos/produto.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movimentacao{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    tipo:string

    @Column()
    quantidade:number

    @Column()
    data:Date
    

    @ManyToOne(()=>Produto, (produto) => produto.movimentacoes)
    produto: Produto

}