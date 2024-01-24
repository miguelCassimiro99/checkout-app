import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { Checkout } from './entities/checkout.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Orquestrate Businness Rules closer the user
// Ex: Save a instance of checkout on DB | Trigger an email

const PRODUCTS_LIST = [
  {
    id: 1,
    name: 'Product 1',
    price: 10,
    description: 'Product 1 Description',
    image_url: 'https://via.placeholder.com/150',
    category_id: 1,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 20,
    description: 'Product 2 Description',
    image_url: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    category_id: 2,
  },
  {
    id: 3,
    name: 'Product 3',
    price: 30,
    description: 'Product 3 Description',
    image_url: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    category_id: 3,
  },
  {
    id: 4,
    name: 'Product 4',
    price: 40,
    description: 'Product 4 Description',
    image_url: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    category_id: 4,
  },
  {
    id: 5,
    name: 'Product 5',
    price: 50,
    description: 'Product 5 Description',
    image_url: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    category_id: 5,
  },
];

@Injectable()
export class CheckoutsService {
  constructor(
    @InjectRepository(Checkout) private checkoutRepo: Repository<Checkout>,
  ) {}

  async create(createCheckoutDto: CreateCheckoutDto) {
    const productsIds: number[] = createCheckoutDto.items.map(
      (item) => item.product_id,
    );
    const products = PRODUCTS_LIST.filter((product) =>
      productsIds.includes(product.id),
    ); // external call to extract the products from the catalog | HTTP CALL For the catalog or other source

    const checkout = Checkout.create({
      items: createCheckoutDto.items.map((item) => {
        const product = products.find((p) => p.id === item.product_id);
        return {
          product_id: product.id,
          quantity: item.quantity,
          price: product.price,
          product: {
            product_id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            image_url: product.image_url,
          },
        };
      }),
    });

    // after create the checkout you can persist
    await this.checkoutRepo.save(checkout);
    return checkout;
  }

  findAll() {
    return this.checkoutRepo.find();
  }

  findOne(id: number) {
    // we can treat this erros with Exceptions Filters
    return this.checkoutRepo.findOneByOrFail({
      id,
    });
  }

  update(id: number, updateCheckoutDto: UpdateCheckoutDto) {
    return `This action updates a #${id} checkout`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkout`;
  }

  async pay(id: number) {
    const checkout = await this.checkoutRepo.findOneByOrFail({
      id,
    });

    checkout.pay();
    return await this.checkoutRepo.save(checkout);
  }

  async fail(id: number) {
    const checkout = await this.checkoutRepo.findOneByOrFail({
      id,
    });

    checkout.fail();
    return await this.checkoutRepo.save(checkout);
  }
}
