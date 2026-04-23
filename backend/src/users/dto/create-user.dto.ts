import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {

@IsNotEmpty()
@IsString()
@MinLength(5)
username!: string;

@IsEmail()
@IsNotEmpty()
email!: string

@IsStrongPassword()
password!: string

}
