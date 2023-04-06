import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class ReplenishBalanceDto {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    value: number;
}