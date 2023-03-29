import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Repository } from 'typeorm';
import { CreateClientAccountDto } from './dto/create-client-account.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>
    ) {}

    findAll() {
        return this.clientRepository.find();
    }

    
    async createClientAccount(createClientAccountDto: CreateClientAccountDto) {
        const client = this.clientRepository.create(createClientAccountDto); 

        const clientRepo = this.clientRepository.save(client);

        const clientInstance: Client = await clientRepo.then(data => data);

        const account = this.accountRepository.create({
            accountType: 0,
            person: clientInstance
        });

        return this.accountRepository.save(account);
    }
}
