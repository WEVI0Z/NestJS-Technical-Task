import { IsBoolean, IsDate, IsNumber } from "class-validator";
import { Client } from "src/clients/entities/client.entity";
import { Transaction } from "src/transactions/entities/transaction.entity";

export class PatchAccountDto {
    person?: Client;

    transactions?: Transaction[]

    @IsNumber()
    balance?: number;

    @IsNumber()
    dailyWithdrawalLimit?: number;

    @IsBoolean()
    active?: boolean;

    @IsNumber()
    accountType?: number;

    @IsDate()
    createDate?: Date;
}