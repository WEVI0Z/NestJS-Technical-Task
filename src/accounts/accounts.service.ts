import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PatchAccountDto } from "./dto/patch-account.dto";
import { Account } from "./entities/account.entity";

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>
    ) {}

    async findAll(): Promise<Account[]> {
        return await this.accountRepository.find({
            relations: ["person"]
        });
    }

    async findOne(id: number): Promise<Account> {
        const account = await this.accountRepository.findOneBy({ id });

        if(!account) {
            throw new NotFoundException(`Account #${id} not found`);
        }

        return account;
    }

    async patchAccount(id: number, patchAccountDto: PatchAccountDto): Promise<Account> {
        const account = await this.accountRepository.preload({
            id: id,
            ...patchAccountDto
        })

        if(!account) {
            throw new NotFoundException(`Account #${id} not found`);
        }

        return this.accountRepository.save(account);
    }

    async getBalance(id: number): Promise<number> {
        const account = await this.findOne(id);

        return account.balance;
    }

    async blockAccount(id: number): Promise<Account> {
        return await this.patchAccount(id, {active: false})
    }
}
