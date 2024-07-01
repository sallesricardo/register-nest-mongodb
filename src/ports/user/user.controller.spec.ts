import { Test, TestingModule } from '@nestjs/testing';
import { UserController, UsersController } from './user.controller';
import { CreateUserUseCase } from '../../core/use-cases/create-user.use-case';
import { FindAllUsersUseCase } from '../../core/use-cases/find-all-users.use-case';
import { User } from '../../core/domain/user.entity';
import { FindUserUseCase } from '../../core/use-cases/find-user.use-case';

describe('UsersController', () => {
    let usersController: UsersController;
    let findAllUsersUseCase: FindAllUsersUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: FindAllUsersUseCase,
                    useValue: {
                        execute: jest.fn().mockResolvedValue([
                            new User(
                                '1',
                                'John Doe',
                                '123.456.789-00',
                                'john@example.com',
                                '11999991111',
                                '1970-01-01',
                                '01001-000',
                                'São Paulo',
                                '11',
                                'SP',
                            ),
                        ]),
                    },
                },
            ],
        }).compile();

        usersController = module.get<UsersController>(UsersController);
        findAllUsersUseCase = module.get<FindAllUsersUseCase>(FindAllUsersUseCase);
    });

    it('should return all users', async () => {
        const users = await usersController.findAll();
        expect(users).toEqual([new User(
            '1',
            'John Doe',
            '123.456.789-00',
            'john@example.com',
            '11999991111',
            '1970-01-01',
            '01001-000',
            'São Paulo',
            '11',
            'SP',
        )]);
        expect(findAllUsersUseCase.execute).toHaveBeenCalled();
    });
});

describe('UserController', () => {
    let userController: UserController;
    let createUserUseCase: CreateUserUseCase;
    let findUserUseCase: FindUserUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: CreateUserUseCase,
                    useValue: {
                        execute: jest.fn().mockResolvedValue(new User(
                            '1',
                            'John Doe',
                            '123.456.789-00',
                            'john@example.com',
                            '11999991111',
                            '1970-01-01',
                            '01001-000',
                            'São Paulo',
                            '11',
                            'SP',
                        )),
                    },
                },
                {
                    provide: FindUserUseCase,
                    useValue: {
                        execute: jest.fn().mockResolvedValue([
                            new User(
                                '1',
                                'John Doe',
                                '123.456.789-00',
                                'john@example.com',
                                '11999991111',
                                '1970-01-01',
                                '01001-000',
                                'São Paulo',
                                '11',
                                'SP',
                            ),
                        ]),
                    },
                },
            ],
        }).compile();

        userController = module.get<UserController>(UserController);
        createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
        findUserUseCase = module.get<FindUserUseCase>(FindUserUseCase);
    });

    it('should create a user', async () => {
        const user = await userController.create({
            name: 'John Doe',
            cpf: '123.456.789-00',
            email: 'john@example.com',
            phone: '11999991111',
            birth: '1970-01-01',
            zipcode: '01001-000',
        });
        expect(user).toEqual(new User(
            '1',
            'John Doe',
            '123.456.789-00',
            'john@example.com',
            '11999991111',
            '1970-01-01',
            '01001-000',
            'São Paulo',
            '11',
            'SP',
        ));
        expect(createUserUseCase.execute).toHaveBeenCalledWith(
            'John Doe',
            '123.456.789-00',
            'john@example.com',
            '11999991111',
            '1970-01-01',
            '01001-000',
        );
    });

    it('should return all users', async () => {
        const users = await userController.findUser('123.456.789-00');
        expect(users).toEqual([new User(
            '1',
            'John Doe',
            '123.456.789-00',
            'john@example.com',
            '11999991111',
            '1970-01-01',
            '01001-000',
            'São Paulo',
            '11',
            'SP',
        )]);
        expect(findUserUseCase.execute).toHaveBeenCalled();
    });
});

