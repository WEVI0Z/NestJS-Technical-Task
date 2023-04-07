import { ApiProperty } from "@nestjs/swagger";
import { Client } from "../../clients/entities/client.entity";
import { Transaction } from "../../transactions/entities/transaction.entity";

export class GetAccountDto {
    @ApiProperty()
    person: Client;

    @ApiProperty()
    transactions: Transaction[]

    @ApiProperty()
    balance: number;

    @ApiProperty()
    dailyWithdrawalLimit: number;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    accountType: number;

    @ApiProperty()
    createDate: Date;
}