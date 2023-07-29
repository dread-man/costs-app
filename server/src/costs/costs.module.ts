import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from 'src/schemas/users.schema';
import { CostsService } from './costs.service';
import { CostsController } from './costs.controller';
import { Cost, CostSchema } from 'src/schemas/costs.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Cost.name, schema: CostSchema }]),
		AuthModule,
    ],
	controllers: [CostsController],
	providers: [CostsService],
})
export class CostsModule {}
