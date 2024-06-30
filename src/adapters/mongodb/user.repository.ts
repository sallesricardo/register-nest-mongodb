import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../core/domain/user.entity';
import { UserRepository } from '../../ports/user/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoUserRepository implements UserRepository {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async save(user: User): Promise<User> {
        const createdUser = new this.userModel(user);
        const savedUser = await createdUser.save();
        return new User(savedUser.name, savedUser.email, savedUser.phone, savedUser.birth, savedUser.zipcode);
    }

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users.map(user => new User(user.name, user.email, user.phone, user.birth, user.zipcode));
    }
}

