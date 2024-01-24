import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckoutsModule } from './checkouts/checkouts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Checkout,
  CheckoutItem,
  CheckoutProduct,
} from './checkouts/entities/checkout.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'microservice-db',
      entities: [Checkout, CheckoutItem, CheckoutProduct],
      synchronize: true,
      logging: true,
    }),
    CheckoutsModule,
  ],
  controllers: [AppController], //mvc -> controllers
  providers: [AppService], // services used by the app (Business Rules, Entitties Persistance)
})
export class AppModule {} //? root module - uses a decorator

//? TypeOrmModule => when using forRoot the recommended usage is to import on the RootModule
//? Sometimes it can be imported on submodules using specific configs
