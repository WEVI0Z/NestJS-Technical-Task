import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { CreateClientAccountDto } from "./dto/create-client-account.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetAccountDto } from "../accounts/dto/get-account.dto";
import { GetClientDto } from "./dto/get-client.dto";

@ApiTags("Clients")
@Controller("clients")
export class ClientsController {
    constructor(
        private readonly clientsService: ClientsService
    ) {}

    @Get()
    @ApiOperation({summary: "Returns array of clients"})
    @ApiResponse({status: HttpStatus.OK, description: "Success", type: [GetClientDto]})
    findAll(): Promise<GetClientDto[]> {
        return this.clientsService.findAll();
    }

    @Post()
    @ApiOperation({summary: "Returns and creates an account and a connected to it client"})
    @ApiResponse({status: HttpStatus.CREATED, description: "Success", type: GetAccountDto})
    createClientAccount(@Body() createClientAccountDto: CreateClientAccountDto): Promise<GetAccountDto> {
        return this.clientsService.createClientAccount(createClientAccountDto);
    }
}
