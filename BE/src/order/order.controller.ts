import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  

  @Post('/create-order')
  async createOrder(@Body() orders: any[]) {
    console.log(orders)  // Nhận mảng order
    const sanitizedOrders = orders.map(({ id, ...rest }) => rest);
    console.log(sanitizedOrders)
      return await Promise.all(sanitizedOrders.map(order => this.orderService.create(order)));
  }
  
}
