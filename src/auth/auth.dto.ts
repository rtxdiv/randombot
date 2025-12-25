import { IsNotEmpty } from "class-validator";

export class AuthDto {
    @IsNotEmpty({ message: 'Неверный пароль' })
    password: string
}