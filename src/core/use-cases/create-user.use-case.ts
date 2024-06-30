import { User } from '../domain/user.entity';
import { UserRepository } from '../../ports/user/user.repository';
import { Inject } from '@nestjs/common';

export class CreateUserUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) { }

    async execute(name: string, cpf: string, email: string, phone: string, birth: string, zipcode: string): Promise<User> {
        const user = new User(
            null,
            name,
            cpf,
            email,
            phone,
            birth,
            zipcode
        );
        return this.userRepository.save(user);
    }
}

