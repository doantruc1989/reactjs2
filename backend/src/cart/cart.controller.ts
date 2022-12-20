import { Body, Controller, Get, Ip, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { CartService } from './cart.service';
import SaveCartDto from './dto/saveCart.dto';
import SaveOrderdto from './dto/saveOrder.dto';

@Controller()
@ApiTags('cart-order')
export class CartController {
    constructor(private cartService: CartService) { }

    @Post('orderitem')
    async saveOrderItem(@Body() saveOrderdto: SaveOrderdto) {
        return this.cartService.saveOrder(saveOrderdto)
    }

    @Get('admin/listorder')
    async listorder() {
        return this.cartService.getListOrder()
    }
}
