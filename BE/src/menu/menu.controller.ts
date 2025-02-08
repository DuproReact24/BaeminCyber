import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Get('getmenu')
  getMenu(){
    return this.menuService.getMenu()
  }
  @Get('getdetailmenu/:id')
  @UseGuards(AuthGuard("jwt"))
  getDetailMenu(@Param('id') id){

    return this.menuService.getDetailMenu(+id)

  }

}
