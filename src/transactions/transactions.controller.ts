import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { BlockedUserGuard } from '../accounts/guards/blocked-user.guard';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { ReplenishBalanceDto } from './dto/replenish-balance.dto';
import { BalanceRequestLimitGuard } from './guards/balance-request-limit.guard';
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
    findAllAccountTransactions(
        @Param("id") id: string, 
        @Query() paginationQuery: PaginationQueryDto
    ) {
        return this.transactionsService.findAllAccountTransactions(+id, paginationQuery);
    }

    @UseGuards(BlockedUserGuard)
    @UseGuards(BalanceRequestLimitGuard)
    @Patch(":id/balance/replenish")
    replenishBalance(
        @Param("id") id: string,
        @Body() replenishBalanceDto: ReplenishBalanceDto
    ) {
        return this.transactionsService.replenishBalance(+id, replenishBalanceDto);
    }
    
    @UseGuards(BlockedUserGuard)
    @UseGuards(BalanceRequestLimitGuard)
    @Patch(":id/balance/withdraw")
    withdrawFromBalance(
        @Param("id") id: string,
        @Body() replenishBalanceDto: ReplenishBalanceDto
    ) {
        return this.transactionsService.withdrawFromBalance(+id, replenishBalanceDto);
    }
}
