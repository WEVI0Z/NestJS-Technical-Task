import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDateString } from "class-validator";

export class CreateClientAccountDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly document: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    readonly birthDate: Date;
}