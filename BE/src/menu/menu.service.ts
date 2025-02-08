import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuService {
    constructor(private prismaservice:PrismaService){}


    getMenu(){
        return this.prismaservice.menus.findMany()
    }
    getDetailMenu(id){
        return this.prismaservice.foods.findMany({
            where:{
                id
            }
        })
    }



}
