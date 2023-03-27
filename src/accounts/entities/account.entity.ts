import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

Entity()
export class account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("person_id")
    personId: number;

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

    @Column("account_type")
    accountType: number;

    @Column({
        name: "create_date",
        default: new Date()
    })
    createDate: Date;
}