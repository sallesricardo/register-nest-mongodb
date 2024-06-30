import { User } from '../domain/user.entity';
import { UserRepository } from '../../ports/user/user.repository';
import { Inject } from '@nestjs/common';

export class CreateUserUseCase {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) { }

    async execute(name: string, email: string, phone: string, birth: string, zipcode: string): Promise<User> {
        console.log("UserRepository", this.userRepository, typeof (this.userRepository))
        const user = new User(name, email, phone, birth, zipcode);
        return this.userRepository.save(user);
    }
}

