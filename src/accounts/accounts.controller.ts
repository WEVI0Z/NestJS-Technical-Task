import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateClientAccountDto } from './dto/create-client-account.dto';
import { ReplenishBalanceDto } from './dto/replenish-balance.dto';

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

    @Patch("balance/replenish/:id")
    replenishBalance(@Param("id") id: string, @Body() replenishBalanceDto: ReplenishBalanceDto) {
        return this.accountsService.replenishBalance(+id, replenishBalanceDto);
    }

    @Get("balance/:id")
    getBalance(@Param("id") id: string) {
        return this.accountsService.getBalance(+id);
    }
}
