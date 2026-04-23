import { IsDateString, IsNotEmpty, IsNumber } from "class-validator"


export class AppointmentDto {

@IsNumber()
@IsNotEmpty()
userId!: number

@IsNumber()
@IsNotEmpty()
barberId!: number

@IsDateString()
date!: Date



}
