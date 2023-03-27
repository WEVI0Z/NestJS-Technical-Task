import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

Entity()
export class account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    document: string;

    @Column()
    birth_date: Date;
}