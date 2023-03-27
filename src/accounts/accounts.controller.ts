import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateClientAccountDto } from './dtos/create-client-account.dto';

@Controller('accounts')
export class AccountsController {
    constructor (
        private readonly accountsService: AccountsService
    ) {}
    
    @Get()
    findAll() {
        return this.accountsService.findAll();
    }

    @Post()
    createClientAccount(@Body() createClientAccountDto: CreateClientAccountDto) {
        return this.accountsService.createClientAccount(createClientAccountDto);
    }
}
