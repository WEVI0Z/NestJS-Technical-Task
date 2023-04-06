import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientAccountDto } from './dto/create-client-account.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Account } from '../accounts/entities/account.entity';
import { Client } from './entities/client.entity';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
    constructor(
        private readonly clientsService: ClientsService
    ) {}

    @Get()
    @ApiOperation({summary: 'Returns array of clients'})
    @ApiResponse({status: HttpStatus.OK, description: "Success", type: Array<Client>})
    findAll() {
        return this.clientsService.findAll();
    }

    @Post()
    @ApiOperation({summary: 'Returns and creates an account and a connected to it client'})
    @ApiResponse({status: HttpStatus.OK, description: "Success", type: Account})
    createClientAccount(@Body() createClientAccountDto: CreateClientAccountDto) {
        return this.clientsService.createClientAccount(createClientAccountDto);
    }
}
