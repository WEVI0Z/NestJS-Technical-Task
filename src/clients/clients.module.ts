import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountsModule } from "../accounts/accounts.module";
import { ClientsController } from "./clients.controller";
import { ClientsService } from "./clients.service";
import { Client } from "./entities/client.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Client]), forwardRef(() => AccountsModule)],
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [TypeOrmModule]
})
export class ClientsModule {}
