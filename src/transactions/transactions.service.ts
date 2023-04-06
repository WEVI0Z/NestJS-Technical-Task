import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from '../accounts/accounts.service';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { ReplenishBalanceDto } from './dto/replenish-balance.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
    constructor(
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

        if (newValue < 0) {
            throw new HttpException(
                "Not enough money on the Account's balance to complete the transaction",
                HttpStatus.CONFLICT
            );
        }

        const account = await this.accountService.patchAccount(id, {balance: newValue});

        const transaction = await this.transactionRepository.create({
            account: account,
            value: replenishValue,
            transactionDate: new Date()
        });
        
        return this.transactionRepository.save(transaction);
    }

    async replenishBalance(id: number, replenishBalanceDto: ReplenishBalanceDto) {
        return await this.operateBalance(id, replenishBalanceDto);
    }

    async withdrawFromBalance(id: number, replenishBalanceDto: ReplenishBalanceDto) {
        return await this.operateBalance(id, replenishBalanceDto, false);
    }

    async findAllAccountTransactions(id: number, paginationQuery: PaginationQueryDto) {
        const account = await this.accountService.findOne(id);

        return await this.transactionRepository.find({
            take: paginationQuery.limit,
            skip: paginationQuery.offset,
            where: { account: account },
            relations: { account: true }
        });
    }
}
