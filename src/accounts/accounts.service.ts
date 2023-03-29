import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReplenishBalanceDto } from '../transactions/dto/replenish-balance.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>
    ) {}

    async findAll() {
        return await this.accountRepository.find({
            relations: ['person']
        });
    }

    async findOne(id: number) {
        return await this.accountRepository.findOneBy({ id })
    }

    async getBalance(id: number) {
        const account = await this.accountRepository.findOneBy({id})

        return account.balance;
    }
}
