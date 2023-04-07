import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccountsService } from "../accounts.service";

@Injectable()
export class BlockedUserGuard implements CanActivate {
  constructor(
    private readonly accountService: AccountsService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;

    const id = params.accountId;

    return this.accountService.findOne(id).then(account => {
      if(!account.active){
        throw new HttpException(`Account #${id} is banned`, HttpStatus.FORBIDDEN);
      }
      
      return account.active;
    });
  }
}
