import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../core/domain/user.entity';
import { UserRepository } from '../../ports/user/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MongoUserRepository implements UserRepository {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async save(user: User): Promise<User> {
        const sameCPF = await this.find({ 'cpf': user.cpf })
        if (sameCPF.length > 0) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: "Already exists a user with this 'cpf'",
            }, HttpStatus.BAD_REQUEST, {
                cause: 'Duplicated'
            });
        }
        const createdUser = new this.userModel(user);
        const savedUser = await createdUser.save();
        return new User(
            savedUser._id?.toString(),
            savedUser.name,
            savedUser.cpf,
            savedUser.email,
            savedUser.phone,
            savedUser.birth,
            savedUser.zipcode,
            savedUser.city,
            savedUser.ddd,
            savedUser.state,
        );
    }

    async find(query: Record<string, string>): Promise<User[]> {
        const usersFound = await this.userModel.find(query).exec();
        return usersFound.map((user) => new User(
            user._id.toString(),
            user.name,
            user.cpf,
            user.email,
            user.phone,
            user.birth,
            user.zipcode,
            user.city,
            user.ddd,
            user.state,
        ))
    }

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users.map(user => new User(
            user._id.toString(),
            user.name,
            user.cpf,
            user.email,
            user.phone,
            user.birth,
            user.zipcode,
            user.city,
            user.ddd,
            user.state,
        ));
    }
}

