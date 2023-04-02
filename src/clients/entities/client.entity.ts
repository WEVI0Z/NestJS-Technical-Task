import { Account } from "../../accounts/entities/account.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    document: string;

    @Column()
    birthDate: Date;

    @OneToOne(() => Account, account => account.person)
    person: Account;
}