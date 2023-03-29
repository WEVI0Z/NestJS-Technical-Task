import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ReplenishBalanceDto } from './dto/replenish-balance.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService
    ) {}

    @Get()
    get() {
        return this.transactionsService.get();
    }

    @Patch(":id/balance")
    replenishBalance(@Param("id") id: string, @Body() replenishBalanceDto: ReplenishBalanceDto) {
        return this.transactionsService.replenishBalance(+id, replenishBalanceDto);
    }
}
