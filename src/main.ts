import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

function connectSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('NestJS Technical Task')
    .setDescription('NestJS Technical Task API description')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
   include: [AppModule],
  });
  
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  connectSwagger(app);

  await app.listen(3001);
}
bootstrap();
