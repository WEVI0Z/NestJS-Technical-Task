import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from '../accounts/accounts.service';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { Account } from '../accounts/entities/account.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { ReplenishBalanceDto } from './dto/replenish-balance.dto';
import { Client } from 'src/clients/entities/client.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  create: jest.fn(),
  preload: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn()
})

const mockBalance = {balance: 0};

const mockClient = {
  id: 1,
  name: 'Test',
  document: 'Test',
  birthDate: new Date(),
}

const mockAccount = {
  id: 1,
  accountType: 0
}

describe('TransactionsService', () => {
  let transactionService: TransactionsService;
  let transactionRepository: MockRepository;
  let accountsRepository: MockRepository;
  let accountsService: AccountsService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: getRepositoryToken(Transaction), useValue: createMockRepository() },
        { provide: getRepositoryToken(Account), useValue: createMockRepository() },
        { provide: AccountsService, useValue: {
          findOne: jest.fn(() => mockBalance),
          patchAccount: jest.fn(async () => mockAccount),
        } },
      ],
    }).compile();

    transactionService = module.get<TransactionsService>(TransactionsService);
    transactionRepository = module.get<MockRepository>(getRepositoryToken(Transaction));
    accountsService = module.get(AccountsService)
  });

  it('should be defined', () => {
    expect(transactionService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return transactions array', async () => {
      const expectedObject: Transaction[] = [];

      transactionRepository.find.mockReturnValue([]);

      const transactions = await transactionService.findAll();

      expect(transactions).toEqual(expectedObject);
    })
  });

  describe('findAllAccountTransactions', () => {
    it('should return transactions array', async () => {
      const id = 1;
      const expectedObject: Transaction[] = [];

      const paginationQuery: PaginationQueryDto = {offset: 0, limit: 0}

      transactionRepository.find.mockReturnValue([]);

      const transactions = await transactionService.findAllAccountTransactions(id, paginationQuery);

      expect(transactions).toEqual(expectedObject);
    })
  });
  
  describe('replenishBalance', () => {
    it('should return new transaction', async () => {
      const id = 1;

      const replenishBalance: ReplenishBalanceDto = {
        value: 34
      }

      const expectedObject = {};

      transactionRepository.create.mockReturnValue({});
      transactionRepository.save.mockReturnValue({});

      const transactions = await transactionService.replenishBalance(id, replenishBalance);

      expect(transactions).toEqual(expectedObject);
    })
  })
});
