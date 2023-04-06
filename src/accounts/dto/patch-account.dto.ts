import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber } from "class-validator";
import { Client } from "../../clients/entities/client.entity";
import { Transaction } from "../../transactions/entities/transaction.entity";

export class PatchAccountDto {
    @ApiProperty()
    person?: Client;

    @ApiProperty()
    transactions?: Transaction[]

    @IsNumber()
    @ApiProperty()
    balance?: number;

    @IsNumber()
    @ApiProperty()
    dailyWithdrawalLimit?: number;

    @IsBoolean()
    @ApiProperty()
    active?: boolean;

    @IsNumber()
    @ApiProperty()
    accountType?: number;

    @IsDate()
    @ApiProperty()
    createDate?: Date;
}