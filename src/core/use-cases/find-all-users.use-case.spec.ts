import { Test, TestingModule } from '@nestjs/testing';
import { FindAllUsersUseCase } from './find-all-users.use-case';
import { UserRepository } from '../../ports/user/user.repository';
import { User } from '../domain/user.entity';

describe('FindAllUsersUseCase', () => {
    let findAllUsersUseCase: FindAllUsersUseCase;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAllUsersUseCase,
                {
                    provide: 'UserRepository',
                    useValue: {
                        findAll: jest.fn().mockResolvedValue([
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

        findAllUsersUseCase = module.get<FindAllUsersUseCase>(FindAllUsersUseCase);
        userRepository = module.get<UserRepository>('UserRepository');
    });

    it('should return all users', async () => {
        const users = await findAllUsersUseCase.execute();
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
        expect(userRepository.findAll).toHaveBeenCalled();
    });
});

