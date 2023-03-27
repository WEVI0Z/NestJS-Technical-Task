import { IsString, IsDate } from "class-validator";

export class CreateClientAccountDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly document: string;

    @IsDate()
    readonly birth_date: Date;
}