import { User } from '../domain/user.entity';
import { UserRepository } from '../../ports/user/user.repository';
import { Inject } from '@nestjs/common';

export class FindAllUsersUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) { }

    async execute(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}

