import { ApiProperty } from "@nestjs/swagger";
import { Client } from "../../clients/entities/client.entity";
import { Transaction } from "../../transactions/entities/transaction.entity";
import { GetClientDto } from "src/clients/dto/get-client.dto";
import { GetTransactionDto } from "src/transactions/dto/get-transaction.dto";

export class GetAccountDto {
    @ApiProperty()
    person: GetClientDto;

    @ApiProperty()
    transactions: GetTransactionDto[]

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