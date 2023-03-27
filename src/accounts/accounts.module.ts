import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from 'src/clients/clients.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), ClientsModule],
  providers: [AccountsService],
  controllers: [AccountsController]
})
export class AccountsModule {}
