import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

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

    async getByID(complaintID: string) {
        const selectedColumn: FindOptionsSelect<Complaint> = {
            User: {
                ID: true,
                FullName: true,
            },
            Admin: {
                ID: true,
                Fullname: true,
            },
            Category: {
                ID: true,
                Tittle: true,
            },
        };

        const relations: FindOptionsRelations<Complaint> = {
            User: true,
            Category: true,
            Admin: true,
        };

        const condition: FindOptionsWhere<Complaint> | FindOptionsWhere<Complaint>[] = { ID: Equal(complaintID) };

        const result = await this.complaintRepository.findOne({
            select: selectedColumn,
            where: condition,
            relations: relations,
        });

        if (!result) {
            throw new BadRequestException('NOT FOUND');
        }

        return result;
    }

    async getAll(payload: any) {
        const { Page, Limit, Sort } = payload;

        payload.Sort = Sort ?? 'ASC';
        payload.Limit = Limit ?? 10;
        payload.Page = Page ?? 1;

        const offset = (payload.Page - 1) * payload.Limit;
        const limit = payload.Limit;
        const sort = payload.Sort;

        const selectedColumn: FindOptionsSelect<Complaint> = {
            User: {
                ID: true,
                FullName: true,
            },
            Admin: {
                ID: true,
                Fullname: true,
            },
            Category: {
                ID: true,
                Tittle: true,
            },
        };

        const relations: FindOptionsRelations<Complaint> = {
            User: true,
            Category: true,
            Admin: true,
        };

        try {
            const result = await this.complaintRepository.findAndCount({
                select: selectedColumn,
                relations: relations,
                order: {
                    CreatedAt: sort,
                },
                skip: offset,
                take: limit,
            });

            return result;
        } catch (err) {
            throw err;
        }
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

    async update(ID: any, payload: any) {
        try {
            await this.complaintRepository.update({ ID: Equal(ID) }, payload);

            const data = await this.getOne({ ID: Equal(ID) });

            return data;
        } catch (err) {
            throw err;
        }
    }
}
