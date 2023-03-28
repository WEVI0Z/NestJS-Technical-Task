import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountId: number;

    @Column()
    value: number;

    @Column()
    transactionDate: Date;
}