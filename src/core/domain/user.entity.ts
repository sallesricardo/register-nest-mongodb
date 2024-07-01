import { IsString, IsEmail, IsDateString, IsNotEmpty } from 'class-validator';

export class User {
    constructor(
        public _id: string,
        public name: string,
        public cpf: string,
        public email: string,
        public phone: string,
        public birth: string,
        public zipcode: string,
        public city: string,
        public ddd: string,
        public state: string,
    ) { }
}

export class InputCreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    cpf: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsDateString()
    birth: string;

    @IsString()
    zipcode: string;
}

