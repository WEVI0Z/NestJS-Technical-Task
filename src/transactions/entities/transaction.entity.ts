import { ApiProperty } from "@nestjs/swagger";
import { Account } from "../../accounts/entities/account.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @JoinColumn()
    @ManyToOne(() => Account, account => account.transactions)
    account: Account;

    @Column()
    @ApiProperty()
    value: number;

    @Column({
        name: "transaction_date"
    })
    @ApiProperty()
    transactionDate: Date;
}