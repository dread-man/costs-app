import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { CostsService } from './costs.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';

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
    @Post()
    @HttpCode(HttpStatus.OK)
    async createCost(@Body() createCostDto: CreateCostDto, @Req() req) {
        const user = await this.authService.getUserByTokenData(req.token);

        return await this.costsService.create({
            ...createCostDto,
            userId: user._id as string,
        });
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async updateCost(
        @Body() updateCostDto: UpdateCostDto,
        @Param('id') id: string,
    ) {
        return await this.costsService.update(updateCostDto, id);
    }

	@UseGuards(JwtGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async deleteCost(
        @Param('id') id: string,
    ) {
        return await this.costsService.delete(id);
    }
}
