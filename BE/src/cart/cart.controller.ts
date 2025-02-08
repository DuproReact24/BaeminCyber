import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post('getall-cart')
  getAllcart(@Body() id){
    console.log(id)
    
     return this.cartService.getAllCart(+id.id)
    
  }
  @Post('deleted-cart')
  deleted(@Body() id){
    return this.cartService.deleted(id.id)
  }
  @Post('addcart')
  addCart(@Body() body){
    const {name,total_price,image,id,user_id,total,food_id,restaurant_id} = body.body
    const creDta = {
      name,total_price,image,id,user_id,total,food_id,
      status:"pending",
      created_at:new Date(),
      restaurant_id
    }
  
    return this.cartService.createCart(creDta)
  }
  
}
