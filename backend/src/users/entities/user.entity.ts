import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'


export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

@Entity()
export class User {

@PrimaryGeneratedColumn()
id!: number;

@Column({unique: true})
username!: string;   

@Column({unique: true})
email!: string;

@Column({select: false})
password!: string;

@Column({ type: 'enum', enum: UserRole, default: UserRole.USER})
role!: UserRole;

@BeforeInsert()
@BeforeUpdate()
async hashpass(){
    if (this.password && !this.password.startsWith('$2b$')){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
}

}
