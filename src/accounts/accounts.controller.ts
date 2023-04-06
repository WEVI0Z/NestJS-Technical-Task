import { Controller, Get, HttpStatus, Param, Patch, UseGuards } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { BlockedUserGuard } from "./guards/blocked-user.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Account } from "./entities/account.entity";

@ApiTags("Accounts")
@Controller("accounts")
export class AccountsController {
    constructor (
        private readonly accountsService: AccountsService
    ) {}
    
    @Get()
    @ApiOperation({summary: "Returns all accounts"})
    @ApiResponse({status: HttpStatus.OK, description: "Success", type: Array<Account>})
    findAll(): Promise<Account[]> {
        return this.accountsService.findAll();
    }

    @UseGuards(BlockedUserGuard)
    @Get(":accountId")
    @ApiOperation({summary: "Returns an account"})
    @ApiResponse({status: HttpStatus.OK, description: "Success", type: Account})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: "Account not found exception"})
    @ApiResponse({status: HttpStatus.FORBIDDEN, description: "Account is banned guard"})
    findOne(@Param("accountId") id: string): Promise<Account> {
        return this.accountsService.findOne(+id);
    }

    @UseGuards(BlockedUserGuard)
    @Get(":accountId/balance")
    @ApiOperation({summary: "Returns an account's balance"})
    @ApiResponse({status: HttpStatus.OK, description: "Success", type: Number})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: "Account not found exception"})
    @ApiResponse({status: HttpStatus.FORBIDDEN, description: "Account is banned guard"})
    getBalance(@Param("accountId") id: string): Promise<number> {
        return this.accountsService.getBalance(+id);
    }

    @Patch(":accountId/block")
    @ApiOperation({summary: "Returns and blocks the account"})
    @ApiResponse({status: HttpStatus.OK, description: "Success", type: Account})
    blockAccount(@Param("accountId") id: string): Promise<Account> {
        return this.accountsService.blockAccount(+id);
    }
}
