import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../core/domain/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @Inject(UserRepository)
        private userRepository: UserRepository,
    ) { }

    async create(user: User): Promise<void> {
        await this.userRepository.save(user);
    }

    async findAll() {
        const rawUsers = await this.userRepository.findAll();
        return rawUsers
    }
}

