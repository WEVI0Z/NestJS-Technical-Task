import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AccountsModule } from "./accounts/accounts.module";
import { AppModule } from "./app.module";
import { ClientsModule } from "./clients/clients.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { ValidationPipe } from "@nestjs/common";

function connectSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle("NestJS Technical Task")
    .setDescription("NestJS Technical Task API description")
    .setVersion("0.0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config, {
   include: [AccountsModule, ClientsModule, TransactionsModule],
  });
  
  SwaggerModule.setup("api", app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  connectSwagger(app);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
