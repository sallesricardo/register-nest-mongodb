import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { UserModule } from './user.module';
import { mongoDB, databaseUri } from '../shared/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        UserModule,
        MongooseModule.forRoot(databaseUri(mongoDB)),
        HttpModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule { }
