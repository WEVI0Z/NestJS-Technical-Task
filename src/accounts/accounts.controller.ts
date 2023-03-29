import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { BlockedUserGuard } from './guards/blocked-user/blocked-user.guard';

@Controller('accounts')
export class AccountsController {
    constructor (
        private readonly accountsService: AccountsService
    ) {}
    
    @Get()
    findAll() {
        return this.accountsService.findAll();
    }

    @UseGuards(BlockedUserGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.accountsService.findOne(+id)
    }

    @UseGuards(BlockedUserGuard)
    @Get(":id/balance")
    getBalance(@Param("id") id: string) {
        return this.accountsService.getBalance(+id);
    }

    @Get(":id/block")
    blockAccount(@Param("id") id: string) {
        return this.accountsService.blockAccount(+id);
    }
}
