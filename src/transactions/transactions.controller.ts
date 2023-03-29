import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
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

    @Patch(":id/balance/replenish")
    replenishBalance(@Param("id") id: string, @Body() replenishBalanceDto: ReplenishBalanceDto) {
        return this.transactionsService.replenishBalance(+id, replenishBalanceDto);
    }
    
    @Patch(":id/balance/withdraw")
    withdrawFromBalance(@Param("id") id: string, @Body() replenishBalanceDto: ReplenishBalanceDto) {
        return this.transactionsService.withdrawFromBalance(+id, replenishBalanceDto);
    }
}
