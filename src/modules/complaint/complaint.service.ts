import { Injectable } from '@nestjs/common';

import { UserInterface } from 'src/interfaces/user.interface';
import { ComplaintRepository } from 'src/respositories/complaint.repository';

@Injectable()
export class ComplaintService {
    constructor(private readonly complaintRepository: ComplaintRepository) {}

    async create(payload: UserInterface, auth: any) {
        const { sub, fullname } = auth;

      

        const result = await this.complaintRepository.create(payload);

        return result;
    }
}
