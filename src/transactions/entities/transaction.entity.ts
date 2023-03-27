import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("account_id")
    accountId: number;

    @Column()
    value: number;

    @Column("transaction_date")
    transactionDate: Date;
}