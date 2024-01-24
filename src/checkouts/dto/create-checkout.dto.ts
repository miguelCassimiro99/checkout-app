// Concept: Date Transfer Object (DTO)
// Transport data between the layers

export class CheckoutItemDto {
  quantity: number;
  product_id: number;
}

export class CreateCheckoutDto {
  // What we need to receive from a POST
  items: CheckoutItemDto[];
}
