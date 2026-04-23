import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
  private UsersRepository: Repository<User>) { }

  async findById(id: number){
    return this.UsersRepository.findOne({
      where: {id},
      select: ['id', 'username', 'role'],
    })
  } 

  async findByUsername(email: string){
    return this.UsersRepository.findOne({
      where: {email},
      select: ['id', 'email', 'password', 'role'],
    })
  } 

  async create(createUserDto: CreateUserDto) {
    const existsUser = await this.UsersRepository.findOne({
      where: 
        [{ email: createUserDto.email }
          , { username: createUserDto.username }]
    })

    if (existsUser) {
      throw new ConflictException("Já existe um usuário com esse email/usuário!")
    }

    const newUser = this.UsersRepository.create(createUserDto)
    await this.UsersRepository.save(newUser)

    return {
      message: "Usuário criado!"
    }
  }

  async delete(id: number) {
    const getUser = await this.UsersRepository.findOne({ where: { id } })

    if (!getUser) {
      throw new NotFoundException("Usuário não encontrado.")
    }

    await this.UsersRepository.delete(id)

    return {
      message: "Usuário deletado!"
    }
  }

  async update(body: CreateUserDto, id: number) {
    const getUser = await this.UsersRepository.findOne({ where: { id } })

    if (!getUser) {
      throw new NotFoundException("Usuário não encontrado.")
    }

    await this.UsersRepository.update(id, body)

    return {
      message: "Usuário atualizado!"
    }
  }

  async createAdmin(body: CreateUserDto) {
    const existsUser = await this.UsersRepository.findOne({
      where: 
        [{ email: body.email }
          , { username: body.username }]
    })

    if (existsUser) {
      throw new ConflictException("Já existe um usuário com esse email/usuário!")
    }

    const newUser = this.UsersRepository.create({...body, role: UserRole.ADMIN})
    await this.UsersRepository.save(newUser)

    return {
      message: "Barbeiro criado!"
    }
  }



}
