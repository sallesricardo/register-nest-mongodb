import { Module } from '@nestjs/common';
import { UserController, UsersController } from '../ports/user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../adapters/mongodb/user.schema';
import { CreateUserUseCase } from '../core/use-cases/create-user.use-case';
import { FindAllUsersUseCase } from '../core/use-cases/find-all-users.use-case';
import { MongoUserRepository } from 'src/adapters/mongodb/user.repository';
import { FindUserUseCase } from 'src/core/use-cases/find-user.use-case';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    controllers: [UsersController, UserController],
    providers: [
        { provide: 'UserRepository', useClass: MongoUserRepository },
        CreateUserUseCase,
        FindUserUseCase,
        FindAllUsersUseCase,
    ],
})

export class UserModule { }
