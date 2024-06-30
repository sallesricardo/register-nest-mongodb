import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { UserModule } from './user.module';
import { mongoDB, databaseUri } from '../shared/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [UserModule, MongooseModule.forRoot(databaseUri(mongoDB))],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule { }
