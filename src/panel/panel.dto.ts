import { IsBoolean, IsNotEmpty } from "class-validator";

export class PanelAdminDto {
    @IsNotEmpty({ message: 'username не может быть пустым' })
    username: string
}