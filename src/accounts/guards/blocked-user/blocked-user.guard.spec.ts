import { BlockedUserGuard } from './blocked-user.guard';

describe('BlockedUserGuard', () => {
  it('should be defined', () => {
    expect(new BlockedUserGuard()).toBeDefined();
  });
});
