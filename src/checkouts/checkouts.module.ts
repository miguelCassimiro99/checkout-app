import { Module } from '@nestjs/common';
import { CheckoutsService } from './checkouts.service';
import { CheckoutsController } from './checkouts.controller';
import {
  Checkout,
  CheckoutItem,
  CheckoutProduct,
} from './entities/checkout.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Checkout, CheckoutItem, CheckoutProduct]),
  ], // create repositories for Checkout
  controllers: [CheckoutsController],
  providers: [CheckoutsService],
})
export class CheckoutsModule {}
