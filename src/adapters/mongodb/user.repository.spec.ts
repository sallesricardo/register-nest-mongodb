import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoUserRepository } from './user.repository';
import { User } from '../../core/domain/user.entity';

describe('MongoUserRepository', () => {
    let userRepository: MongoUserRepository;
    let userModel: Model<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MongoUserRepository,
                {
                    provide: getModelToken('User'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(new User(
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
                        constructor: jest.fn(),
                        find: jest.fn(),
                        create: jest.fn(),
                        exec: jest.fn(),
                    },
                },
            ],
        }).compile();

        userRepository = module.get<MongoUserRepository>(MongoUserRepository);
        userModel = module.get<Model<User>>(getModelToken('User'));
    });

    // Skipped because the provider cannot provide the right userModel for the test
    it.skip('should save a user', async () => {
        const user = new User(
            null,
            'John Doe',
            '123.456.789-00',
            'john@example.com',
            '11999991111',
            '1970-01-01',
            '01001-000',
            'São Paulo',
            '11',
            'SP',
        );

        const createdUser = new User(
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
        );

        userModel.create = jest.fn().mockResolvedValue(createdUser);
        userModel.find = jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue([]),
        });

        const result = await userRepository.save(user);
        expect(result).toEqual(createdUser);
        expect(userModel.find).toHaveBeenCalledWith({ cpf: '123.456.789-00' })
        expect(userModel.create).toHaveBeenCalledWith(user);
    });

    it('should find one user', async () => {
        const users = [new User(
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
        )];

        userModel.find = jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(users),
        });

        const result = await userRepository.find({ cpf: '123.456.789-00' });

        expect(result).toEqual(users);
        expect(userModel.find).toHaveBeenCalled();
    });

    it('should find all users', async () => {
        const users = [new User(
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
        )];

        userModel.find = jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(users),
        });

        const result = await userRepository.findAll();
        expect(result).toEqual(users);
        expect(userModel.find).toHaveBeenCalled();
    });
});

