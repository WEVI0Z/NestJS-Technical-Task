import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as request from "supertest";
import { TransactionsModule } from "../../src/transactions/transactions.module";
import { ReplenishBalanceDto } from "../../src/transactions/dto/replenish-balance.dto";
import { Repository } from "typeorm";
import { Client } from "../../src/clients/entities/client.entity";
import { Account } from "../../src/accounts/entities/account.entity";
import { Transaction } from "../../src/transactions/entities/transaction.entity";

describe("[Feature] Transactions (e2e)", () => {
  const client = {
    name: "Wevioz",
    document: "KH0403240",
    birthDate: new Date()
  }

  const balance = {
    value: 34
  }

  let clientRepository: Repository<Client>;
  let accountRepository: Repository<Account>;
  let transactionRepository: Repository<Transaction>;
  let accountId: number;

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TransactionsModule,
        TypeOrmModule.forRoot({
          type: "postgres",
          host: "localhost",
          port: 5433,
          username: "postgres",
          password: "pass123",
          database: "postgres",
          entities: [Client, Account, Transaction],
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    clientRepository = moduleFixture.get("ClientRepository");
    accountRepository = moduleFixture.get("AccountRepository");
    transactionRepository = moduleFixture.get("TransactionRepository"); 

    const clientRepo = clientRepository.save({
      ...client,
    });

    const clientInstance: Client = await clientRepo.then(data => data);

    const account = await accountRepository.create({
        accountType: 0,
        person: clientInstance
    });

    const accountInstance = await accountRepository.save(account);

    accountId = accountInstance.id;

    await app.init();
  });

  describe("Find all transactions [GET /]", () => {
    it("should return OK status", () => {
      return request(app.getHttpServer())
          .get("/transactions")
          .expect(HttpStatus.OK)
    });
  })

  describe("Replenish balance [PATCH /:id/balance/replenish]", () => {
    it("should return OK status", () => {
      return request(app.getHttpServer())
          .patch(`/transactions/${accountId}/balance/replenish`)
          .send(balance as ReplenishBalanceDto)
          .expect(HttpStatus.OK)
    })
  })

  describe("Find all account transactions [GET /:id]", () => {
    it("Should return OK status", () => {
      return request(app.getHttpServer())
          .get(`/transactions/${accountId}`)
          .expect(HttpStatus.OK)
    });
  })

  describe("Withdraw from balance [PATCH /:id/balance/replenish]", () => {
    describe("when there is anouth money", () => {
      it("Should return OK status", () => {
        return request(app.getHttpServer())
            .patch(`/transactions/${accountId}/balance/withdraw`)
            .send(balance as ReplenishBalanceDto)
            .expect(HttpStatus.OK)
      })
    })
    
    describe("otherwise", () => {
      it("Should return CONFLICT status", () => {
        return request(app.getHttpServer())
            .patch(`/transactions/${accountId}/balance/withdraw`)
            .send(balance as ReplenishBalanceDto)
            .expect(HttpStatus.CONFLICT)
      })
    })
  })
  
  afterAll(async () => {
    await transactionRepository.remove(await transactionRepository.find())
    await accountRepository.remove(await accountRepository.find())
    await clientRepository.remove(await clientRepository.find())

    await app.close();
  })
});
