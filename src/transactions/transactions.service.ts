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

    async findAll() {
        return await this.transactionRepository.find({
            relations: { account: true }
        });
    }

    async operateBalance(id: number, replenishBalanceDto: ReplenishBalanceDto, addMoney: boolean = true) {
        const accountData = await this.accountRepository.findOne({
            where: {id},
            select: {balance: true}
        });

        if(!accountData) {
            throw new NotFoundException(`Account #${id} not found`);
        }

        const replenishValue = replenishBalanceDto.value;
        const newValue = addMoney ? accountData.balance + replenishValue : accountData.balance - replenishValue;

        const account = await this.accountRepository.preload({
            id: +id,
            balance: newValue,
        });

        const transaction = await this.transactionRepository.create({
            account: account,
            value: replenishValue,
            transactionDate: new Date()
        })

        this.accountRepository.save(account);
        
        return this.transactionRepository.save(transaction);
    }

    async replenishBalance(id: number, replenishBalanceDto: ReplenishBalanceDto) {
        return await this.operateBalance(id, replenishBalanceDto);
    }

    async withdrawFromBalance(id: number, replenishBalanceDto: ReplenishBalanceDto) {
        return await this.operateBalance(id, replenishBalanceDto, false);
    }
}
