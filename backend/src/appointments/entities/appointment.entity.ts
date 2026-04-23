import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";


@Entity()
export class Appointment {

@PrimaryGeneratedColumn()
id!: number;

@ManyToOne(() => User, {onDelete: "CASCADE"})
@JoinColumn({name: "userId"})
user!: User

@ManyToOne(() => User, {onDelete: "CASCADE"})
@JoinColumn({name: "barberId"})
barber!: User

@Column()
date!: Date;


}


