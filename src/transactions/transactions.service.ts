import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Repository } from 'typeorm';
import { ReplenishBalanceDto } from './dto/replenish-balance.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
    ) {}

    async get() {
        return await this.transactionRepository.find();
    }

    async replenishBalance(id: number, replenishBalanceDto: ReplenishBalanceDto) {
        const accountData = await this.accountRepository.findOne({
            where: {id},
            select: {balance: true}
        });

        const account = await this.accountRepository.preload({
            id: +id,
            balance: accountData.balance + replenishBalanceDto.value
        })
        
        if(!account) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return this.accountRepository.save(account);
    }
}

