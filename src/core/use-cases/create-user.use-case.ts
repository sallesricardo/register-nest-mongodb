import { User } from '../domain/user.entity';
import { UserRepository } from '../../ports/user/user.repository';
import { Inject } from '@nestjs/common';
import { LocationRepository } from '../../ports/location/location.repository';

export class CreateUserUseCase {
    constructor(
        @Inject('UserRepository') private readonly userRepository: UserRepository,
        @Inject('LocationRepository') private readonly locationRepository: LocationRepository
    ) { }

    async execute(
        name: string,
        cpf: string,
        email: string,
        phone: string,
        birth: string,
        zipcode: string,
    ): Promise<User> {
        const locationData = await this.locationRepository.getLocationData(zipcode);
        const user = new User(
            null,
            name,
            cpf,
            email,
            phone,
            birth,
            zipcode,
            locationData.localidade,
            locationData.ddd,
            locationData.uf
        );
        return this.userRepository.save(user);
    }
}

