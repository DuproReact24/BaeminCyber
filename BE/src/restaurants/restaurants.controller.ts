import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}
  @Get('/getall')
  @UseGuards(AuthGuard("jwt"))
  getAll(){

    return this.restaurantsService.getAll()


  }
  @Get('/getdetail/:id')
   @UseGuards(AuthGuard("jwt"))
  getDetail(@Param('id') id:string){
    console.log(id)
    return this.restaurantsService.getDetail(+id)

  }
  @Post('/create')
  @UseInterceptors(FileInterceptor("hinhAnh", {
    storage: diskStorage({
      destination: process.cwd() + "/public/images",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname),
    })
  }))
  create(@Body() body,@UploadedFile() file){
    
     return this.restaurantsService.create(body,file)
  }
  @Get('/getbycategory/:category')
// @UseGuards(AuthGuard("jwt"))
searchByName(@Param('category') name: string) {
  console.log(1,name)
  return this.restaurantsService.searchByName(name);
}

  
}
