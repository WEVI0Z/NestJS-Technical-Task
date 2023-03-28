import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDate } from "class-validator";

export class CreateClientAccountDto {
    @IsString()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @ApiProperty()
    readonly document: string;

    @IsDate()
    @ApiProperty()
    readonly birthDate: Date;
}