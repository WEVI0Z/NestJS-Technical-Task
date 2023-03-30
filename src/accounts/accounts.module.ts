import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '../clients/clients.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), forwardRef(() => ClientsModule)],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [TypeOrmModule, AccountsService]
})
export class AccountsModule {}
