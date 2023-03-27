import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

Entity()
export class account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    person_id: number;

    @Column()
    balance: number;

    @Column()
    daily_withdrawal_limit: number;

    @Column()
    active: boolean;

    @Column()
    account_type: number;

    @Column()
    create_data: Date;
}