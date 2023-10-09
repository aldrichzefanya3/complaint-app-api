import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Admin } from './admins.entity';
import { Category } from './categories.entity';
import { User } from './users.entity';

@Entity({ name: 'complaints' })
export class Complaint {
    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @Column()
    UserID: string;

    @Column()
    AdminID: string;

    @Column()
    CategoryID: number;

    @Column({
        type: 'text',
    })
    IssueDescription: string;

    @Column({
        type: 'text',
    })
    Details: string;

    @Column()
    Remark: string;

    @Column({
        type: 'boolean',
    })
    IsRemarked: number;

    @Column()
    CreatedAt: number;

    @Column()
    CreatedBy: string;

    @Column()
    UpdatedAt: number;

    @Column()
    UpdatedBy: string;

    @ManyToOne(() => User)
    @JoinColumn({
        name: 'UserID',
        referencedColumnName: 'ID',
    })
    User: User;

    @ManyToOne(() => Admin)
    @JoinColumn({
        name: 'AdminID',
        referencedColumnName: 'ID',
    })
    Admin: Admin;

    @ManyToOne(() => Category)
    @JoinColumn({
        name: 'CategoryID',
        referencedColumnName: 'ID',
    })
    Category: Category;
}
