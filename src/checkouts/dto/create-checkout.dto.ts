/* eslint-disable prettier/prettier */
// Concept: Date Transfer Object (DTO)
// Transport data between the layers

import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  ValidateNested,
} from 'class-validator';

export class CheckoutItemDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  product_id: number;
}

export class CreateCheckoutDto {
  // What we need to receive from a POST
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items: CheckoutItemDto[];
}
