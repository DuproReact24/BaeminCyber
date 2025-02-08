import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
interface UserLog{
                full_name: string,
                email: string,
                phone: string,
                address: string,
                password: string,
}
@Injectable()
export class UserService {
    constructor(private prismaservice:PrismaService,  private jwtService: JwtService){
        
    }
  async  register(userLogin){
        const saltOrRounds = 10;
       
        const hash = await  bcrypt.hash(userLogin.password, saltOrRounds);
      
        userLogin.password = hash
        return this.prismaservice.users.create({
            data: {
                full_name: userLogin.full_name,
                email: userLogin.email,
                phone: userLogin.phone,
                address: userLogin.address,
                password: userLogin.password, 
              },
        })
    }
   async login(res:UserLog){

        const user = await this.prismaservice.users.findFirst({
            where:{email:res.email}
        })
   
        if (!user) {
            throw new Error('User not found');
          }
      
            const isPasswordValid = await bcrypt.compare(res.password, user.password);
      
            if (isPasswordValid) {
              const token = await this.jwtService.signAsync({ data: user.email }, { expiresIn: "20m", secret: "BI_MAT" })
            
                return await {id:user.id,token:token,address:user.address}
              } else {
                throw new Error('Invalid credentials');
              }
    }
}       
