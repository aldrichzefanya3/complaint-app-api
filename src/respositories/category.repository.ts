import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

import { Category } from 'src/entities/categories.entity';

@Injectable()
export class CategoryRepository {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async getOne(condition: any) {
        const result = await this.categoryRepository.findOne({ where: condition });

        return result;
    }

    async getByID(categoryID: number) {
        const result = await this.categoryRepository.findOne({ where: { ID: Equal(categoryID) } });

        if (!result) {
            throw new BadRequestException('NOT FOUND');
        }

        return result;
    }
}
