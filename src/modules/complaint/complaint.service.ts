import { Injectable } from '@nestjs/common';

import { CategoryRepository } from 'src/respositories/category.repository';
import { ComplaintRepository } from 'src/respositories/complaint.repository';
import { UserRepository } from 'src/respositories/users.repository';
import { DateFormatter } from 'src/utils/date-formatter.util';

@Injectable()
export class ComplaintService {
    constructor(private readonly complaintRepository: ComplaintRepository, private readonly categoryRepository: CategoryRepository, private readonly userRepository: UserRepository) {}

    async getAllComplaint(payload: any) {
        const { Page, Limit } = payload;

        payload.Limit = Limit ?? 10;
        payload.Page = Page ?? 1;

        const [result, count] = await this.complaintRepository.getAll(payload);

        const pagination = {
            Data: result,
            CurrentPage: payload.Page,
            LastPage: Math.ceil(count / payload.Limit),
            Limit: payload.Limit,
            Total: count,
        };

        return pagination;
    }

    async getComplaintByID(payload: any) {
        const { ID } = payload;

        const result = await this.complaintRepository.getByID(ID);

        return result;
    }

    async createComplaint(payload: any, auth: any) {
        const { sub, fullname } = auth;

        const { CategoryID, Details, ImageFileName, ImageName } = payload;

        const user = await this.checkUserByID(sub);

        const category = await this.checkCategoryByID(CategoryID);

        payload['UserID'] = user.ID;
        payload['CategoryID'] = category.ID;
        payload['CreatedBy'] = fullname;
        payload['CreatedAt'] = DateFormatter.getTimestamp();

        let details = {};
        if (!Details && ImageFileName) {
            details[`${ImageName}`] = `${process.env.BASE_URL_APP}${ImageFileName}`;

            payload['Details'] = JSON.stringify(details);
        } else if (Details && ImageFileName) {
            details = JSON.parse(Details);

            details[`${ImageName}`] = `${process.env.BASE_URL_APP}${ImageFileName}`;
            payload['Details'] = JSON.stringify(details);
        }

        const result = await this.complaintRepository.create(payload);

        return result;
    }

    async checkUserByID(userID: string) {
        const data = await this.userRepository.getByID(userID);

        return data;
    }

    async checkCategoryByID(categoryID: number) {
        const data = await this.categoryRepository.getByID(categoryID);

        return data;
    }

    async updateComplaintByID(payload: any) {
        const { ID, Remark } = payload;

        await this.complaintRepository.getByID(ID);

        const updatedComplaint = {
            AdminID: 'e7c5d378-002f-4da7-8fdb-042528cfa85e',
            Remark: Remark,
            IsRemarked: true,
            UpdatedAt: DateFormatter.getTimestamp(),
        };

        const result = await this.complaintRepository.update(ID, updatedComplaint);

        return result;
    }
}
