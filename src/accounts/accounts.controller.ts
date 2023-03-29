import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ReplenishBalanceDto } from '../transactions/dto/replenish-balance.dto';

@Controller('accounts')
export class AccountsController {
    constructor (
        private readonly accountsService: AccountsService
    ) {}
    
    @Get()
    findAll() {
        return this.accountsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.accountsService.findOne(+id)
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
