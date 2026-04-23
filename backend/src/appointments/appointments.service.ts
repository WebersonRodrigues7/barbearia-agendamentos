import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AppointmentDto } from './dto/create-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { NotFoundError } from 'rxjs';
import { UserRole } from '../users/entities/user.entity';


@Injectable()
export class AppointmentsService {
  constructor(@InjectRepository(Appointment)
  private appointmentRepository: Repository<Appointment>,
  private readonly usersService: UsersService ) {}

  async create(body: AppointmentDto) {
  const validateUser = await this.usersService.findById(body.userId)

    if(!validateUser) throw new NotFoundException("Usuário não encontrado.")
    
    if(validateUser?.role == null) throw new NotFoundException()
    
    if (validateUser.role != UserRole.USER) throw new UnauthorizedException()
    
  const validateBarber = await this.usersService.findById(body.barberId)

    if(!validateBarber) throw new NotFoundException("Barbeiro não encontrado.")
    
    if (validateBarber.role == null) throw new NotFoundException()
    
    if (validateBarber.role != UserRole.ADMIN) throw new UnauthorizedException()

    const existAppointment = await this.appointmentRepository.findOne({where: {barber: {id: validateBarber.id }, date: body.date}})

    if(existAppointment) {
      throw new ConflictException("Agendamento já existe nesse horário.")
    }

    const newAppointment = this.appointmentRepository.create({
      user: validateUser,
      barber: validateBarber,
      date: body.date


    })
    await this.appointmentRepository.save(newAppointment)
    

    return {
      message: "Agendamento criado!"
    }
  }

  async delete (id: number, userId: number, role: UserRole) {
    const getAppointments = await this.appointmentRepository.findOne({where: {id: id}, relations: ['user', 'barber']})
    if(!getAppointments) throw new NotFoundException("Agendamento não encontrado.")

      if(role == UserRole.ADMIN && getAppointments.barber.id === userId) {
        await this.appointmentRepository.delete(getAppointments)
      }
      else if(role == UserRole.USER && getAppointments.user.id === userId) {
        await this.appointmentRepository.delete(getAppointments)
      } else {
        throw new UnauthorizedException("Esse agendamento não é seu.")
      }

    return {
      message: "Agendamento cancelado!"
    }
  }

  async get(id:number, role:UserRole){

    if(role == UserRole.ADMIN){
      return this.appointmentRepository.find({where: {barber: {id: id} } })
    } 
    else {
      return this.appointmentRepository.find({where: {user: {id: id} } })
    }
  }
}