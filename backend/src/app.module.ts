import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import User from './users/entity/user.entity';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/entity/product.entity';
import { CartModule } from './cart/cart.module';
import { Category } from './product/entity/category';
import { BlogModule } from './blog/blog.module';
import { Blog } from './blog/entity/blog.entity';
import { OrderItem } from './cart/entity/OrderItem';
import { SaleRevenue } from './cart/entity/SaleRevenue.entity';
import { Province } from './cart/entity/Province.entity';
import { HomepageModule } from './homepage/homepage.module';
import { Hero } from './homepage/entity/hero';
import { Bosuutap } from './homepage/entity/bosuutap';
import { Giasochomnay } from './homepage/entity/giasochomnay';
import { Thuonghieuchinhhang } from './homepage/entity/thuonghieuchinhhang';
import { Thuonghieusaletet } from './homepage/entity/thuonghieusaletet';

@Module({

  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'db3',
    entities: [User, Product, Category, Blog, OrderItem, SaleRevenue, Province, Hero, Bosuutap, Giasochomnay,Thuonghieuchinhhang,Thuonghieusaletet],
    synchronize: true,
  }), ProductModule, CartModule, BlogModule, HomepageModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
