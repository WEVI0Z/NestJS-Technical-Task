import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '../clients/clients.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';

describe('AccountsController', () => {
  let accountController: AccountsController;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Account]), ClientsModule],
      controllers: [AccountsController],
      providers: [AccountsService]
    }).compile();

    accountController = module.get<AccountsController>(AccountsController);
    accountsService = module.get<AccountsService>(AccountsService)
  });

  it('should be defined', () => {
    expect(accountController).toBeDefined();
  });
});
