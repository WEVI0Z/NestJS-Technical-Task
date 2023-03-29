import { Controller, Get, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';

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

    @Get(":id/balance")
    getBalance(@Param("id") id: string) {
        return this.accountsService.getBalance(+id);
    }
}
