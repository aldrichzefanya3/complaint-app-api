import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

import { User } from '../entities/users.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getOne(condition: any) {
        const result = await this.userRepository.findOne({ where: condition });

        return result;
    }

    async getByID(userID: string) {
        const result = await this.userRepository.findOne({ where: { ID: Equal(userID) } });

        if (!result) {
            throw new BadRequestException('NOT FOUND');
        }

        return result;
    }

    async create(payload: any) {
        try {
            const data = await this.userRepository.create(payload);

            await this.userRepository.insert(data);

            return data;
        } catch (err) {
            throw err;
        }
    }
}
