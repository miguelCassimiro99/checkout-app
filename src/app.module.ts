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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: 'root',
      password: process.env.DB_PASSWORD,
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
