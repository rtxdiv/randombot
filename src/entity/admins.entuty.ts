import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity('admins')
export class Admins {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    username: string

    @Column({ default: true })
    active: boolean
}