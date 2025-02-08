import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
constructor(private prismaservice:PrismaService){
        
    }
    async create(body){
         
        
       
            await this.prismaservice.orders.create({data:body})
        

    }
}
