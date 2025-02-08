import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {

    constructor(private prismaService:PrismaService){
        
    }




    getAllCart(id: number) {
       
        return this.prismaService.cart.findMany({
            where: {
                user_id:id, // Chỉ cần truyền vào giá trị số nguyên của user_id
            },
        });
    }
    deleted(id:number){
        return this.prismaService.cart.delete({
            where:{
                id:id
            }
        })
    }
   async createCart(body:any){
   
       
            
            const index = await this.prismaService.cart.findFirst({
                where:{
                    food_id:body.food_id
                }
            })
            if(!index){
                await this.prismaService.cart.create({data:body})
            }else{
                await this.prismaService.cart.update({
                    where:{
                        id:index.id
                    },data:{
                        total:body.total,
                        total_price:body.total_price
                        
                    }
                })
            }


    }
    



}

