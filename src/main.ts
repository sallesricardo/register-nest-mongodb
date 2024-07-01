import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { app as appConfig } from './shared/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { abortOnError: false });

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    console.log(`Starting server on port: ${appConfig.port}`);
    await app.listen(appConfig.port);
}

bootstrap();

