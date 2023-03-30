import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>
const createMockRepository = <T = any>(): MockRepository<T> => ({
    findOne: jest.fn(),
    create: jest.fn(),
})

describe('AccountsService', () => {
  let service: AccountsService;
  let accountRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        { provide: getRepositoryToken(Account), useValue: createMockRepository()}
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    accountRepository = module.get<MockRepository>(getRepositoryToken(Account));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
