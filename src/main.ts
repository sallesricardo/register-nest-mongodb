import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { abortOnError: false });

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    console.log(`Starting server on port: ${process.env.PORT}`);
    await app.listen(process.env.PORT);
}

bootstrap();

