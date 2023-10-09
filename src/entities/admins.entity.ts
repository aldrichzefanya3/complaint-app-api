import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'admins' })
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @Column()
    Fullname: string;
}
