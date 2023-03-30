import { Test, TestingModule } from '@nestjs/testing';
import { Body, HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { TransactionsModule } from '../../src/transactions/transactions.module';
import { CreateClientAccountDto } from '../../src/clients/dto/create-client-account.dto';
import { ReplenishBalanceDto } from '../../src/transactions/dto/replenish-balance.dto';
import { DataSource, Repository } from 'typeorm';
import { Client } from '../../src/clients/entities/client.entity';
import { Account } from '../../src/accounts/entities/account.entity';
import { Transaction } from '../../src/transactions/entities/transaction.entity';

describe('[Feature] Transactions (e2e)', () => {
  const client = {
    name: "Wevioz",
    document: "KH0403240",
    birthDate: new Date()
  }

  const balance = {
    value: 34
  }

  let clientRepository: Repository<Client>
  let accountRepository: Repository<Account>
  let transactionRepository: Repository<Transaction>

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

    clientRepository.create(client); 

    const clientRepo = clientRepository.save(client);

    const clientInstance: Client = await clientRepo.then(data => data);

    const account = accountRepository.create({
        accountType: 0,
        person: clientInstance
    });

    await accountRepository.save(account);

    await app.init();
  });

  it('Find all transactions [GET /]', () => {
    return request(app.getHttpServer())
        .get('/transactions')
        .expect(HttpStatus.OK)
  });
  it('Replenish balance [PATCH /:id/balance/replenish]', () => {
    return request(app.getHttpServer())
        .patch('/transactions/1/balance/replenish')
        .send(balance as ReplenishBalanceDto)
        .expect(HttpStatus.OK)
  })
  it('Find all account transactions [GET /:id]', () => {
    return request(app.getHttpServer())
        .get('/transactions/1')
        .expect(HttpStatus.OK)
  });
  it.todo('Create [UPDATE ONE /:id]');
  it.todo('Create [DELETE ONE /:id]');
  
  afterAll(async () => {
    await transactionRepository.remove(await transactionRepository.find())
    await accountRepository.remove(await accountRepository.find())
    await clientRepository.remove(await clientRepository.find())

    await app.close();
  })
});
