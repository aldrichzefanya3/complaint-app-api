import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from 'src/entities/admins.entity';
import { Category } from 'src/entities/categories.entity';
import { Complaint } from 'src/entities/complaints.entity';
import { User } from 'src/entities/users.entity';
import { CategoryRepository } from 'src/respositories/category.repository';
import { ComplaintRepository } from 'src/respositories/complaint.repository';
import { UserRepository } from 'src/respositories/users.repository';

import { ComplaintController } from './complaint.controller';
import { ComplaintService } from './complaint.service';

@Module({
    imports: [TypeOrmModule.forFeature([Complaint, User, Admin, Category])],
    controllers: [ComplaintController],
    providers: [ComplaintService, ComplaintRepository, UserRepository, CategoryRepository],
})
export class ComplaintModule {}
