import { User } from '../domain/user.entity';
import { UserRepository } from '../../ports/user/user.repository';
import { Inject } from '@nestjs/common';

export class FindUserUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) { }

    async execute(query: Record<string, string>): Promise<User[]> {
        return this.userRepository.find(query);
    }
}

