import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from '../../core/use-cases/create-user.use-case';
import { FindAllUsersUseCase } from '../../core/use-cases/find-all-users.use-case';
import { User } from '../../core/domain/user.entity';

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findAllUsersUseCase: FindAllUsersUseCase
    ) { }

    @Post()
    async create(@Body() createUserDto: any): Promise<User> {
        return this.createUserUseCase.execute(createUserDto.name, createUserDto.email, createUserDto.phone, createUserDto.birth, createUserDto.zipcode);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.findAllUsersUseCase.execute();
    }
}

