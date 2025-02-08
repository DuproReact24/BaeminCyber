import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantsService {

    constructor(private prismaservice:PrismaService){}



    getAll(){
        return this.prismaservice.restaurants.findMany()
    }
  
    async getDetail(id: number) {
            const restaurant = await this.prismaservice.restaurants.findFirst({
                where: { id },
                include: {
                    menus: { 
                        include: {
                            foods: true
                        }
                    }
                }
            });
        
            if (!restaurant) {
                return { message: "Nhà hàng không tồn tại!" };
            }
        
            return restaurant;
        }
    
    create(body,filename){
        body.image = filename.filename
        return this.prismaservice.restaurants.create({
            data:body
        })
    }
    searchByName(name: string) {
        console.log(name)
        return this.prismaservice.restaurants.findMany({
          where: {
            category: {
              contains: name,  
              mode: 'insensitive', 
            },
          },
        });
      }
      


}
