import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entity/cart.entity';
import { OrderItem } from './entity/OrderItem';
import { Product } from 'src/product/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, OrderItem, Product])],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule { }
