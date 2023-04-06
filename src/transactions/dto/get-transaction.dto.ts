import { ApiProperty } from "@nestjs/swagger";
import { Account } from "../../accounts/entities/account.entity";

export class GetTransaction {
    @ApiProperty()
    id: number;

    @ApiProperty()
    account: Account;

    @ApiProperty()
    value: number;

    @ApiProperty()
    transactionDate: Date;
}