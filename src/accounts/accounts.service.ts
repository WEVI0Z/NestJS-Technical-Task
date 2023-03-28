import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';
import { CreateClientAccountDto } from './dto/create-client-account.dto';
import { ReplenishBalanceDto } from './dto/replenish-balance.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>
    ) {}

    async findAll() {
        return await this.accountRepository.find();
    }

    async createClientAccount(createClientAccountDto: CreateClientAccountDto) {
        const client = this.clientRepository.create(createClientAccountDto); 

        const repoClient = this.clientRepository.save(client);

        let clientId = 0;

        await repoClient.then(client => clientId = client.id)

        const account = this.accountRepository.create({
            accountType: 0,
            personId: clientId
        });


        return this.accountRepository.save(account);
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

    async getBalance(id: number) {
        const account = await this.accountRepository.findOneBy({id})

        return account.balance;
    }
}
