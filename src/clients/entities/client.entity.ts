import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    document: string;

    @Column("birth_date")
    birthDate: Date;
}