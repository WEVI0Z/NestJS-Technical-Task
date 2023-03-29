import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccountsService } from 'src/accounts/accounts.service';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class BalanceRequestLimitGuard implements CanActivate {
  constructor(
    private readonly accountService: AccountsService,
    private readonly transactionsService: TransactionsService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;

    const id = params.id;
    
    return this.transactionsService.findAllAccountTransactions(id, { limit: 10, offset: 0 }).then(transactions => {
      return this.accountService.findOne(id).then(account => {
        let check: number = 0;
        const currentDate: Date = new Date();
        const newDate: Date = new Date(currentDate.setDate(currentDate.getDate() + 1));

        transactions.forEach(transaction => {
          check += transaction.transactionDate < newDate ? 1 : 0
        })

        if(account.dailyWithdrawalLimit > check){
          return account.dailyWithdrawalLimit > check;
        } else {
          throw new HttpException(
            `Account #${id} withdrawal limit is only ${account.dailyWithdrawalLimit} operations per day`,
            403
          )
        }
      });
    });
  }
}
