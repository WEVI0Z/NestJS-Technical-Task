import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';
import { CreateClientAccountDto } from './dtos/create-client-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>
    ) {}

    findAll() {
        return this.accountRepository.find();
    }

    createClientAccount(createClientAccountDto: CreateClientAccountDto) {
        const account = this.accountRepository.create({accountType: 0});
        const client = this.clientRepository.create(createClientAccountDto); 
        return this.accountRepository.save(account);
    }
}
