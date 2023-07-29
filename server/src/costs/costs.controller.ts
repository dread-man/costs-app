import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { CostsService } from './costs.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateCostDto } from './dto/create-cost.dto';

@Controller('cost')
export class CostsController {
    constructor(
        private readonly costsService: CostsService,
        private readonly authService: AuthService,
    ) {}

    @UseGuards(JwtGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllCosts(@Req() req, @Res() res) {
        const token = req.token;

        const user = await this.authService.getUserByTokenData(token);
        const costs = await this.costsService.fundAll();
        const filltredCosts = costs.filter(
            (cost) => cost.userId === user._id.toString(),
        );

        return res.send(filltredCosts);
    }

    @UseGuards(JwtGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async createCost(@Body() createCostDto: CreateCostDto, @Req() req) {
        const user = await this.authService.getUserByTokenData(req.token);

        return await this.costsService.create({
            ...createCostDto,
            userId: user._id as string,
        });
    }
}
