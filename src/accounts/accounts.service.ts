import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';
import { CreateClientAccountDto } from './dto/create-client-account.dto';
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

        console.log(client);

        const repoClient = this.clientRepository.save(client);

        let clientId = 0;

        await repoClient.then(client => clientId = client.id)

        const account = this.accountRepository.create({
            accountType: 0,
            personId: clientId
        });


        return this.accountRepository.save(account);
    }
}
