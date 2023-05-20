import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT_APP || 5600;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder().setTitle('InforceStore').setDescription('RestApi').setVersion('1.0.0').addTag('test').build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);


  await app.listen(PORT, () =>
    console.log(`Server has been started on port = ${PORT}`),
  );
}
bootstrap();
