import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
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

    @Column()
    accountType: number;

    @Column({
        name: "create_date",
        default: new Date()
    })
    createDate: Date;
}