import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';
import { Repository } from 'typeorm';
import SaveOrderdto from './dto/saveOrder.dto';
import { CartItem } from './entity/cart.entity';
import { OrderItem } from './entity/OrderItem';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(CartItem)
        private cartRepository: Repository<CartItem>,
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) { }

    async saveOrder(saveOrderdto: SaveOrderdto) {
        const item = JSON.parse(saveOrderdto.orderItems)
        console.log(item);
        let revenue: number;
        let totalRevenue: number = 0;
        for (let i = 0; i < item.length; i++) {
            const productId = item[i].id;
            const qty = item[i].quantity;
            const product = await this.productRepository.findOneBy({ id: productId });
            product.quantity = product.quantity - qty;
            await this.productRepository.save(product);
            revenue = (product.price - product.initialPrice) * qty;
            totalRevenue += revenue;
            saveOrderdto.revenue = totalRevenue;
            await this.orderItemRepository.save(saveOrderdto)
        }
    }

    async getListOrder() {
        return await this.orderItemRepository.find()
    }
}
