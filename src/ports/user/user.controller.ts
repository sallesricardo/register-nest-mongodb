import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserUseCase } from '../../core/use-cases/create-user.use-case';
import { FindAllUsersUseCase } from '../../core/use-cases/find-all-users.use-case';
import { User, InputCreateUserDto } from '../../core/domain/user.entity';
import { FindUserUseCase } from 'src/core/use-cases/find-user.use-case';

@Controller('users')
export class UsersController {
    constructor(
        private readonly findAllUsersUseCase: FindAllUsersUseCase
    ) { }

    @Get()
    async findAll(): Promise<User[]> {
        return this.findAllUsersUseCase.execute();
    }
}

@Controller('user')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findUserUseCase: FindUserUseCase,
    ) { }

    @Get(':cpf')
    async findUser(@Param('cpf') cpf: string) {
        return this.findUserUseCase.execute({ 'cpf': cpf });
    }

    @Post()
    async create(@Body() createUserDto: InputCreateUserDto): Promise<User> {
        return this.createUserUseCase.execute(
            createUserDto.name,
            createUserDto.cpf,
            createUserDto.email,
            createUserDto.phone,
            createUserDto.birth,
            createUserDto.zipcode
        );
    }
}
