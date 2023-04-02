import { ApiProperty } from "@nestjs/swagger";
import { Client } from "../../clients/entities/client.entity";
import { Transaction } from "../../transactions/entities/transaction.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;
    
    @JoinColumn()
    @OneToOne(() => Client, client => client.person)
    @ApiProperty()
    person: Client;

    @OneToMany(() => Transaction, transaction => transaction.account)
    @ApiProperty()
    transactions: Transaction[]

    @Column({
        default: 0
    })
    balance: number;

    @Column({
        name: "daily_withdrawal_limit",
        default: 10
    })
    @ApiProperty()
    dailyWithdrawalLimit: number;

    @Column({
        default: true
    })
    @ApiProperty()
    active: boolean;

    @Column({
        name: "account_type"
    })
    @ApiProperty()
    accountType: number;

    @Column({
        name: "create_date",
        default: new Date()
    })
    @ApiProperty()
    createDate: Date;
}