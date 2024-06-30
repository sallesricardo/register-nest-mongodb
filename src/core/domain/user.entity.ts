import { IsString, IsEmail, IsNumberString, IsDateString } from 'class-validator';

export class User {
    constructor(
        public id: string | null,
        public name: string,
        public cpf: string,
        public email: string,
        public phone: string,
        public birth: string,
        public zipcode: string,
        //    public location: {
        //        city: string
        //        locationId: string
        //        state: string
        //    }
    ) { }
}

export class InputCreateUserDto {
    @IsString()
    name: string;

    @IsString()
    cpf: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsDateString()
    birth: string;

    @IsNumberString()
    zipcode: string;
}

