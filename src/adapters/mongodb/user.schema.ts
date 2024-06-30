import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    birth: String,
    zipcode: String,
});

