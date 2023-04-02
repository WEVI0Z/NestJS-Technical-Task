import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { TransactionsModule } from '../../src/transactions/transactions.module';
import { Repository } from 'typeorm';
import { Client } from '../../src/clients/entities/client.entity';
import { Account } from '../../src/accounts/entities/account.entity';
import { Transaction } from '../../src/transactions/entities/transaction.entity';

describe('[Feature] Clients (e2e)', () => {
  const client = {
      name: "Wevioz",
      document: "KH0403240",
      birthDate: new Date()
  }

  let clientRepository: Repository<Client>;
  let accountRepository: Repository<Account>;
  let transactionRepository: Repository<Transaction>;

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TransactionsModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          entities: [Client, Account, Transaction],
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    clientRepository = moduleFixture.get('ClientRepository');
    accountRepository = moduleFixture.get('AccountRepository');
    transactionRepository = moduleFixture.get('TransactionRepository');

    await app.init();
  });

  describe('Find all clients [GET /]', () => {
    it('should return OK status', () => {
      return request(app.getHttpServer())
          .get('/clients')
          .expect(HttpStatus.OK)
    });
  })

  describe('Create a client [POST /]', () => {
    it('should return CREATED status', () => {
      return request(app.getHttpServer())
          .post('/clients')
          .send(client as Client)
          .expect(HttpStatus.CREATED)
    });
  })

  afterAll(async () => {
    await transactionRepository.remove(await transactionRepository.find())
    await accountRepository.remove(await accountRepository.find())
    await clientRepository.remove(await clientRepository.find())

    await app.close();
  })
});
