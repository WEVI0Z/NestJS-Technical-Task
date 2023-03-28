import { Account } from "src/accounts/entities/account.entity";
import { Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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