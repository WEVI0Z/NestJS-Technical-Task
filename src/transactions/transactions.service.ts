import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';
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
        private readonly accountService: AccountsService
    ) {}

    async findAll() {
        return await this.transactionRepository.find({
            relations: { account: true }
        });
    }

    async operateBalance(id: number, replenishBalanceDto: ReplenishBalanceDto, addMoney: boolean = true) {
        const accountData = await this.accountService.findOne(id);

        const replenishValue = replenishBalanceDto.value;
        const newValue = addMoney ? accountData.balance + replenishValue : accountData.balance - replenishValue;

        const account = await this.accountService.patchAccount(id, {balance: newValue})

        const transaction = await this.transactionRepository.create({
            account: account,
            value: replenishValue,
            transactionDate: new Date()
        })
        
        return this.transactionRepository.save(transaction);
    }

    async replenishBalance(id: number, replenishBalanceDto: ReplenishBalanceDto) {
        return await this.operateBalance(id, replenishBalanceDto);
    }

    async withdrawFromBalance(id: number, replenishBalanceDto: ReplenishBalanceDto) {
        return await this.operateBalance(id, replenishBalanceDto, false);
    }

    async findAllAccountTransactions(id: number) {
        const account = await this.accountService.findOne(1);

        return await this.transactionRepository.find({
            where: { account: account },
            relations: { account: true }
        });
    }
}
