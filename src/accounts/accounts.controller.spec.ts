import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccountsService } from "./accounts.service";
import { Account } from "./entities/account.entity";
import { HttpException } from "@nestjs/common";
import { AccountsController } from "./accounts.controller";

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>
const createMockRepository = <T = any>(): MockRepository<T> => ({
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    preload: jest.fn(),
    save: jest.fn()
});

describe("AccountsService", () => {
  let service: AccountsService;
  let controller: AccountsController;
  let accountRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        AccountsController,
        { provide: getRepositoryToken(Account), useValue: createMockRepository()}
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    controller = module.get<AccountsController>(AccountsController);
    accountRepository = module.get<MockRepository>(getRepositoryToken(Account));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return accounts array", async () => {
      const expectedObject: Account[] = [];

      accountRepository.find.mockReturnValue([]);

      const accounts = await controller.findAll();

      expect(accounts).toEqual(expectedObject);
    });
  });

  describe("findOne", () => {
    describe("when there is an account", () => {
      it("should return an account", async () => {
        const expectedObject = {}
  
        accountRepository.findOne.mockReturnValue({});
  
        const accounts = await controller.findOne("1");
  
        expect(accounts).toEqual(expectedObject);
      });
    });

    describe("otherwise", () => {
      it("should return an http exception", async () => {  
        accountRepository.findOne.mockReturnValue(undefined);
  
        try {
          await controller.findOne("1");
        } catch(err) {
          expect(err).toBeInstanceOf(HttpException);
        }
      });
    });

    describe("when the user is blocked", () => {
      it("should return a http exception", async () => {
          accountRepository.findOne.mockReturnValue({
              status: false
          });
  
          try {
            await controller.findOne("1");
          } catch(err) {
            expect(err).toBeInstanceOf(HttpException);
            expect(err.status).toBe(403);
            expect(err.message).toBe("Account #1 is banned");
          }
      });
    });
  });

  describe("getBalance", () => {
    describe("when there is an account", () => {
      it("should return a number", async () => {  
        accountRepository.findOne.mockReturnValue({
          balance: 0
        });
  
        const balance = await controller.getBalance("1");
  
        expect(typeof balance).toBe("number");
      });
    });
    
    describe("otherwise", () => {
      it("should return an http exception", async () => {  
        accountRepository.findOne.mockReturnValue(undefined);
  
        try {
          await controller.getBalance("1");
        } catch(err) {
          expect(err).toBeInstanceOf(HttpException);
        }
      });
    });
  });

  describe("blockAccount", () => {
    describe("when there is an account", () => {
      it("should return an account", async () => {
        const expectedObject = {};

        accountRepository.preload.mockReturnValue({});
        accountRepository.save.mockReturnValue({});

        const account = await controller.blockAccount("1");

        expect(account).toEqual(expectedObject);
      });
    });

    describe("otherwise", () => {
      it("should return a http exception", async () => {
        accountRepository.preload.mockReturnValue(undefined);

        try {
          await controller.blockAccount("1");
        } catch(err) {
          expect(err).toBeInstanceOf(HttpException);
        }
      });
    });
  });
});
