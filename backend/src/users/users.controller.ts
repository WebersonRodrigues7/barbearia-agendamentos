import { Controller, Post, Body, Put, Delete, Param, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return newUser;
  }


  @UseGuards(AuthGuard('jwt'))
  @Post('/admin')
  async createAdmin(@Body() body: CreateUserDto) {
    const newAdmin = await this.usersService.createAdmin(body)
    return newAdmin;
  }


  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Body() body: CreateUserDto, @Param('id') id: number) {
    const updateUser = await this.usersService.update(body, id)
    return updateUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleteUser = await this.usersService.delete(id)
    return deleteUser;
  }


}
