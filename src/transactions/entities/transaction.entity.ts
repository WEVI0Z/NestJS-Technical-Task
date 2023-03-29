import { Account } from "src/accounts/entities/account.entity";
import { Client } from "src/clients/entities/client.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn()
    @ManyToOne(() => Account, account => account.transactions)
    account: Account;

    @Column()
    value: number;

    @Column({
        name: "transaction_date"
    })
    transactionDate: Date;
}