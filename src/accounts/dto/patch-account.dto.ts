import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { Client } from "../../clients/entities/client.entity";
import { Transaction } from "../../transactions/entities/transaction.entity";
import { Type } from "class-transformer";

export class PatchAccountDto {
    @ValidateNested()
    @Type(() => Client)
    @IsOptional()
    @ApiProperty()
    person?: Client;

    @ValidateNested({each: true})
    @Type(() => Transaction)
    @IsOptional()
    @ApiProperty()
    transactions?: Transaction[]

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    balance?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    dailyWithdrawalLimit?: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    active?: boolean;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    accountType?: number;

    @IsDate()
    @IsOptional()
    @ApiProperty()
    createDate?: Date;
}