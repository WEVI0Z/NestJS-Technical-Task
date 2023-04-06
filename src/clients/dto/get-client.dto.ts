import { ApiProperty } from "@nestjs/swagger";

export class GetClientDto {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly document: string;

    @ApiProperty()
    readonly birthDate: Date;
}