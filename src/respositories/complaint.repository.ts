import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Complaint } from 'src/entities/complaints.entity';

@Injectable()
export class ComplaintRepository {
    constructor(
        @InjectRepository(Complaint)
        private readonly complaintRepository: Repository<Complaint>,
    ) {}

    async getOne(condition: any) {
        const result = await this.complaintRepository.findOne({ where: condition });

        return result;
    }

    async getByID(ComplaintID: string) {
        const result = await this.complaintRepository.findOne({ where: { ID: ComplaintID } });

        if (!result) {
            throw new BadRequestException('NOT FOUND');
        }

        return result;
    }

    async create(payload: any) {
        try {
            const data = await this.complaintRepository.create(payload);

            await this.complaintRepository.insert(data);

            return data;
        } catch (err) {
            throw err;
        }
    }
}
