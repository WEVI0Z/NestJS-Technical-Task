import { ApiProperty } from "@nestjs/swagger";
import { Account } from "../../accounts/entities/account.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class GetTransaction {
    @ApiProperty()
    id: number;

    @ApiProperty()
    account: Account;

    @ApiProperty()
    value: number;

    @Column()
    @ApiProperty()
    transactionDate: Date;
}