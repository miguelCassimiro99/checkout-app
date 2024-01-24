import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type CreateCheckoutCommand = {
  items: {
    quantity: number;
    price: number;
    product: {
      name: string;
      description: string;
      image_url: string;
      product_id: number;
    };
  }[];
};

export enum CheckoutStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  status: CheckoutStatus = CheckoutStatus.PENDING;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => CheckoutItem, (item) => item.checkout, {
    cascade: true,
  }) //it will save on the table checkout_items table
  items: CheckoutItem[];

  static create(input: CreateCheckoutCommand) {
    const checkout = new Checkout();
    checkout.items = input.items.map((item) => {
      const checkoutItem = new CheckoutItem();
      checkoutItem.quantity = item.quantity;
      checkoutItem.price = item.price;
      checkoutItem.product = new CheckoutProduct();
      checkoutItem.product.name = item.product.name;
      checkoutItem.product.description = item.product.description;
      checkoutItem.product.image_url = item.product.image_url;
      checkoutItem.product.product_id = item.product.product_id;
      return checkoutItem;
    });

    checkout.total = checkout.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    return checkout;
  }

  pay() {
    if (this.status === CheckoutStatus.PAID)
      throw new Error('The checkout is already paid');

    if (this.status === CheckoutStatus.FAILED)
      throw new Error('The checkout failed');

    this.status = CheckoutStatus.PAID;
  }

  fail() {
    if (this.status === CheckoutStatus.FAILED)
      throw new Error('The checkout failed');

    if (this.status === CheckoutStatus.PAID)
      throw new Error('The checkout is already paid');

    this.status = CheckoutStatus.FAILED;
  }
}

// The DB Model
@Entity()
export class CheckoutProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image_url: string;

  @Column()
  product_id: number; //product id from another microservice
}

@Entity()
export class CheckoutItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Checkout)
  checkout: Checkout;

  @ManyToOne(() => CheckoutProduct, {
    cascade: ['insert'],
    eager: true,
  })
  product: CheckoutProduct;
}

// Usually, microservices have their own DB (are independent)
