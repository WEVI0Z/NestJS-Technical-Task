import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { BlockedUserGuard } from 'src/accounts/guards/blocked-user/blocked-user.guard';
import { ReplenishBalanceDto } from './dto/replenish-balance.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService
    ) {}

    @Get()
    findAll() {
        return this.transactionsService.findAll();
    }

    @UseGuards(BlockedUserGuard)
    @Get(":id")
    findAllAccountTransactions(@Param("id") id: string) {
        return this.transactionsService.findAllAccountTransactions(+id);
    }

    @UseGuards(BlockedUserGuard)
    @Patch(":id/balance/replenish")
    replenishBalance(@Param("id") id: string, @Body() replenishBalanceDto: ReplenishBalanceDto) {
        return this.transactionsService.replenishBalance(+id, replenishBalanceDto);
    }
    
    @UseGuards(BlockedUserGuard)
    @Patch(":id/balance/withdraw")
    withdrawFromBalance(@Param("id") id: string, @Body() replenishBalanceDto: ReplenishBalanceDto) {
        return this.transactionsService.withdrawFromBalance(+id, replenishBalanceDto);
    }
}
