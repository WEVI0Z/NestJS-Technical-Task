import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Query, UseGuards } from "@nestjs/common";
import { BlockedUserGuard } from "../accounts/guards/blocked-user.guard";
import { PaginationQueryDto } from "./dto/pagination-query.dto";
import { ReplenishBalanceDto } from "./dto/replenish-balance.dto";
import { BalanceRequestLimitGuard } from "./guards/balance-request-limit.guard";
import { TransactionsService } from "./transactions.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetTransactionDto } from "./dto/get-transaction.dto";

@ApiTags("Transactions")
@Controller("transactions")
export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService
    ) {}

    @Get()
    @ApiOperation({summary: "Returns all transactions"})
    @ApiResponse({status: HttpStatus.OK, description: "Success", type: [GetTransactionDto]})
    findAll(): Promise<GetTransactionDto[]> {
        return this.transactionsService.findAll();
    }

    @UseGuards(BlockedUserGuard)
    @Get(":accountId")
    @ApiOperation({summary: "Returns all the account\"s transactions"})
    @ApiResponse({status: HttpStatus.OK, description: "Success", type: [GetTransactionDto]})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: "Account not found exception"})
    @ApiResponse({status: HttpStatus.FORBIDDEN, description: "Account is banned guard"})
    findAllAccountTransactions(
        @Param("accountId", ParseIntPipe) id: number, 
        @Query() paginationQuery: PaginationQueryDto
    ): Promise<GetTransactionDto[]> {
        return this.transactionsService.findAllAccountTransactions(id, paginationQuery);
    }

    @UseGuards(BlockedUserGuard)
    @UseGuards(BalanceRequestLimitGuard)
    @Patch(":accountId/balance/replenish")
    @ApiOperation({summary: "Replenishes the balance of the account"})
    @ApiResponse({status: HttpStatus.OK, description: "Success", type: GetTransactionDto})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: "Account not found exception"})
    @ApiResponse({status: HttpStatus.FORBIDDEN, description: "Account is banned guard"})
    replenishBalance(
        @Param("accountId", ParseIntPipe) id: number,
        @Body() replenishBalanceDto: ReplenishBalanceDto
    ): Promise<GetTransactionDto> {
        return this.transactionsService.replenishBalance(id, replenishBalanceDto);
    }
    
    @UseGuards(BlockedUserGuard, BalanceRequestLimitGuard)
    @Patch(":accountId/balance/withdraw")
    @ApiOperation({summary: "Withdraws from the account's balance"})
    @ApiResponse({status: HttpStatus.OK, description: "Success", type: GetTransactionDto})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: "Account not found exception"})
    @ApiResponse({status: HttpStatus.FORBIDDEN, description: "Account is banned guard"})
    withdrawFromBalance(
        @Param("accountId", ParseIntPipe) id: number,
        @Body() replenishBalanceDto: ReplenishBalanceDto
    ): Promise<GetTransactionDto> {
        return this.transactionsService.withdrawFromBalance(id, replenishBalanceDto);
    }
}
