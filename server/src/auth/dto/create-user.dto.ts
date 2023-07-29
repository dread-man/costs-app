import { IsNotEmpty } from 'class-validator';

export class createUserDto {
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;
}
