import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccountsService } from "../../accounts/accounts.service";
import { TransactionsService } from "../../transactions/transactions.service";
import { PaginationQueryDto } from "../dto/pagination-query.dto";

@Injectable()
export class BalanceRequestLimitGuard implements CanActivate {
  constructor(
    private readonly accountService: AccountsService,
    private readonly transactionsService: TransactionsService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;

    const id = params.accountId;
    
    const transactions = await this.transactionsService.findAllAccountTransactions(id, {limit: 10, offset: 0});

    const account = await this.accountService.findOne(id);

    let check: number = 0;
    const currentDate: Date = new Date();
    const newDate: Date = new Date(currentDate.setDate(currentDate.getDate() + 1));

    transactions.forEach(transaction => {
      check += transaction.transactionDate < newDate ? 1 : 0;
    });

    if(account.dailyWithdrawalLimit <= check) {
      throw new HttpException(
        `Account #${id} withdrawal limit is only ${account.dailyWithdrawalLimit} operations per day`,
        HttpStatus.FORBIDDEN
      );
    }
    
    return account.dailyWithdrawalLimit > check;
  }
}
