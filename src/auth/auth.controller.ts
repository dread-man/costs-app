import {
    Controller,
    Post,
    Body,
    Res,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
import { createUserDto } from './dto/create-user.dto';
import { RegistrationGuard } from './guards/registration.guard';

@Controller('auth')
export class AuthController {
    constructor(private usersService: UsersService) {}

    @UseGuards(RegistrationGuard)
    @Post('registration')
    async registrationUser(
        @Body() createUserDto: createUserDto,
        @Res() res: Response,
    ) {
        await this.usersService.registartion(createUserDto);

        res.statusCode = HttpStatus.CREATED;
        return res.send('user created');
    }
}
