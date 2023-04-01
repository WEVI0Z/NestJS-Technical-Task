import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from '../accounts/entities/account.entity';
import { Repository } from 'typeorm';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { CreateClientAccountDto } from './dto/create-client-account.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
})

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

  describe('findAll', () => {
    it('should return clients array', async () => {
      const expectedObject: Client[] = [];

      clientRepository.find.mockReturnValue([]);

      const clients = await service.findAll();

      expect(clients).toEqual(expectedObject);
    })
  });

  describe('createClientAccount', () => {
    it('should return new account instance', async () => {
      const expectedObject = {};

      const createClientAccount: CreateClientAccountDto = {
        name: 'name',
        document: 'document',
        birthDate: new Date()
      }

      clientRepository.create.mockReturnValue({});
      clientRepository.save.mockReturnValue({});

      accountRepository.create.mockReturnValue({});
      accountRepository.save.mockReturnValue({});

      const clients = await service.createClientAccount(createClientAccount);

      expect(clients).toEqual(expectedObject);
    })
  });
});
