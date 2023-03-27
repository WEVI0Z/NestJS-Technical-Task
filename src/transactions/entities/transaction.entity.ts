import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

Entity()
export class account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    account_id: number;

    @Column()
    value: number;

    @Column()
    transaction_date: Date;
}