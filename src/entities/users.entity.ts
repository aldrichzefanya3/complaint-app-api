import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column()
    FullName: string;

    @Column()
    Email: string;

    @Column()
    GoogleID: string;

    @Column()
    GoogleResponse: string;

    @Column()
    CreatedAt: number;
}
