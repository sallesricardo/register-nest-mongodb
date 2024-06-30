import { User } from '../../core/domain/user.entity';

export abstract class UserRepository {
    abstract save(user: User): Promise<User>;
    abstract findAll(): Promise<User[]>;
}

