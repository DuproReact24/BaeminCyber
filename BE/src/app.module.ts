import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { FoodModule } from './food/food.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MenuModule } from './menu/menu.module';

import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [UserModule, OrderModule, FoodModule, RestaurantsModule, MenuModule, PrismaModule,JwtModule.register({}), ConfigModule.forRoot(), CartModule,],
  controllers: [AppController],
  providers: [AppService, PrismaService,JwtStrategy],
})
export class AppModule {}
