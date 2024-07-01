import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user.use-case';
import { UserRepository } from '../../ports/user/user.repository';
import { User } from '../domain/user.entity';
import { LocationRepository } from 'src/ports/location/location.repository';
import { Location } from '../domain/location.entity';

describe('CreateUserUseCase', () => {
    let createUserUseCase: CreateUserUseCase;
    let userRepository: UserRepository;
    let locationRepository: LocationRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateUserUseCase,
                {
                    provide: 'UserRepository',
                    useValue: {
                        save: jest.fn().mockResolvedValue(new User(
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
                    provide: 'LocationRepository',
                    useValue: {
                        getLocationData: jest.fn().mockResolvedValue(
                            new Location(
                                "01001-000",
                                "Praça da Sé",
                                "lado ímpar",
                                "",
                                "Sé",
                                "São Paulo",
                                "SP",
                                "3550308",
                                "1004",
                                "11",
                                "7107",
                            )
                        )
                    }
                }
            ],
        }).compile();

        createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
        userRepository = module.get<UserRepository>('UserRepository');
        locationRepository = module.get<LocationRepository>('LocationRepository')
    });

    it('should create a user', async () => {
        const user = await createUserUseCase.execute(
            'John Doe',
            '123.456.789-00',
            'john@example.com',
            '11999991111',
            '1970-01-01',
            '01001-000',
        );
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
        expect(userRepository.save).toHaveBeenCalledWith(new User(
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
        ));
    });
});

