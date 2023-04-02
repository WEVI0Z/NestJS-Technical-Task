import { ApiProperty } from "@nestjs/swagger";
import { Account } from "../../accounts/entities/account.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    name: string;

    @Column()
    @ApiProperty()
    document: string;

    @Column()
    @ApiProperty()
    birthDate: Date;

    @OneToOne(() => Account, account => account.person)
    person: Account;
}