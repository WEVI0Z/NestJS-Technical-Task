import { BalanceRequestLimitGuard } from './balance-request-limit.guard';

describe('BalanceRequestLimitGuard', () => {
  it('should be defined', () => {
    expect(new BalanceRequestLimitGuard()).toBeDefined();
  });
});
