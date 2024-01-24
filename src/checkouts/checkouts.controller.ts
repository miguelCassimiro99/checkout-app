import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CheckoutsService } from './checkouts.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@Controller('checkouts')
export class CheckoutsController {
  constructor(private readonly checkoutsService: CheckoutsService) {}

  @Post()
  create(@Body() createCheckoutDto: CreateCheckoutDto) {
    return this.checkoutsService.create(createCheckoutDto);
  }

  @Get()
  findAll() {
    return this.checkoutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkoutsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkoutsService.remove(+id);
  }

  @Post(':id/pay')
  pay(@Param('id') id: string) {
    return this.checkoutsService.pay(+id);
  }

  @Post(':id/fail')
  fail(@Param('id') id: string) {
    return this.checkoutsService.fail(+id);
  }
}
