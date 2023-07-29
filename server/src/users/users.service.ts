import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUserDto } from 'src/auth/dto/create-user.dto';
import { User, UsersDocument } from 'src/schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private usersModel: Model<UsersDocument>,
    ) {}

    async registartion(createUserDto: createUserDto): Promise<User> | null {
        const existingUser = await this.usersModel.collection.findOne({
            username: createUserDto.username,
        });

        if (existingUser) {
            return null;
        }

        const createdUser = new this.usersModel(createUserDto);
        return createdUser.save();
    }

	async findOne(username: string): Promise<User> {
		return this.usersModel.findOne({ username })
	}
}
