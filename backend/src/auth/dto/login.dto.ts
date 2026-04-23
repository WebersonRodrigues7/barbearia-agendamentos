import { IsNotEmpty, IsString } from "class-validator";


// validacao do body do login
export class LoginDTO {
@IsString()
@IsNotEmpty()
email!: string;

@IsString()
@IsNotEmpty()
password!: string;

}
