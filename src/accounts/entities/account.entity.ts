import { Client } from "src/clients/entities/client.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;
    
    @JoinColumn()
    @OneToOne(() => Client, client => client.person)
    person: Client;

    @Column({
        default: 0
    })
    balance: number;

    @Column({
        name: "daily_withdrawal_limit",
        default: 10
    })
    dailyWithdrawalLimit: number;

    @Column({
        default: true
    })
    active: boolean;

    @Column({
        name: "account_type"
    })
    accountType: number;

    @Column({
        name: "create_date",
        default: new Date()
    })
    createDate: Date;
}