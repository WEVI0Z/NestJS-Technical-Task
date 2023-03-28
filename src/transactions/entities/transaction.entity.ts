import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "account_id"
    })
    accountId: number;

    @Column()
    value: number;

    @Column({
        name: "transaction_date"
    })
    transactionDate: Date;
}