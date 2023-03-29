import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientAccountDto } from './dto/create-client-account.dto';

@Controller('clients')
export class ClientsController {
    constructor(
        private readonly clientsService: ClientsService
    ) {}

    @Get()
    findAll() {
        return this.clientsService.findAll();
    }

    @Post()
    createClientAccount(@Body() createClientAccountDto: CreateClientAccountDto) {
        return this.clientsService.createClientAccount(createClientAccountDto);
    }
}
