import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from '../accounts/entities/account.entity';
import { Repository } from 'typeorm';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>
const createMockRepository = <T = any>(): MockRepository<T> => ({})

describe('ClientsService', () => {
  let service: ClientsService;
  let accountRepository: MockRepository;
  let clientRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        { provide: getRepositoryToken(Account), useValue: createMockRepository() },
        { provide: getRepositoryToken(Client), useValue: createMockRepository() }
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    accountRepository = module.get<MockRepository>(getRepositoryToken(Account));
    clientRepository = module.get<MockRepository>(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
