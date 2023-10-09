import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Equal } from 'typeorm';

import { UserInterface } from 'src/interfaces/user.interface';
import { UserRepository } from 'src/respositories/users.repository';
import { DateFormatter } from 'src/utils/date-formatter.util';

@Injectable()
export class OAuthService {
    constructor(private readonly userRepository: UserRepository, private jwtService: JwtService) {}

    async loginThirdParty(payload: any) {
        const user = await this.validateUser(payload);

        return user;
    }

    async validateUser(payload: UserInterface) {
        const { FirstName, LastName, Email } = payload;

        const condition = {
            Email: Equal(Email),
        };

        const user = await this.userRepository.getOne(condition);

        if (!user) {
            payload.CreatedAt = DateFormatter.getTimestamp();
            payload.FullName = await this.getFullname(FirstName, LastName);

            const save = await this.createUser(payload);

            return save;
        }

        const jwtPayload = {
            sub: user.ID,
            fullname: user.FullName,
        };

        return {
            AccessToken: await this.jwtService.sign(jwtPayload, { secret: process.env.JWT_SECRET_KEY }),
        };
    }

    async getFullname(Firstname: string, Lastname?: string): Promise<string> {
        const lastname = !Lastname ? '' : Lastname;

        const fullname = `${Firstname} ${lastname}`.trim();

        return fullname;
    }

    async getUserByID(ID: string) {
        const user = await this.userRepository.getByID(ID);

        return user;
    }

    async createUser(payload: UserInterface) {
        const result = await this.userRepository.create(payload);

        return result;
    }

    async generateJwt(payload: any) {
        return this.jwtService.sign(payload);
    }
}
