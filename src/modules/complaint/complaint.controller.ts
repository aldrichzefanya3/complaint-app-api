import { join } from 'path';

import { Controller, Get, Logger, Post, Put, Req, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';

import { DateFormatter } from 'src/utils/date-formatter.util';
import { JWTGuard } from 'src/utils/jwt-guard.util';
import { ResponseFormatter } from 'src/utils/response.util';

import { ComplaintService } from './complaint.service';

@Controller('/complaint/')
export class ComplaintController {
    constructor(private readonly complaintService: ComplaintService) {}

    @Get()
    async getAll(@Req() req: Request, @Res() res: Response) {
        try {
            const payload = req.query;

            const result = await this.complaintService.getAllComplaint(payload);

            return ResponseFormatter.response(result, res);
        } catch (err) {
            Logger.error(err);
            return ResponseFormatter.responseWithErrorMessage(err.response.message, res);
        }
    }

    @Get(':ID')
    async getByID(@Req() req: Request, @Res() res: Response) {
        try {
            const payload = req.params;

            const result = await this.complaintService.getComplaintByID(payload);

            return ResponseFormatter.response(result, res);
        } catch (err) {
            Logger.error(err);
            return ResponseFormatter.responseWithErrorMessage(err.response.message, res);
        }
    }

    @Post()
    @UseGuards(JWTGuard)
    @UseInterceptors(
        FilesInterceptor('AttachmentFiles[]', Infinity, {
            storage: diskStorage({
                destination: join(__dirname, '../../..', 'public/attachments'),
                filename: (req, file, cb) => {
                    const originalFileName = file.originalname.split('.');
                    const fileExt = originalFileName[originalFileName.length - 1];

                    cb(null, `attachment_${DateFormatter.getTimestamp()}.${fileExt}`);
                },
            }),
        }),
    )
    async create(@Req() req: Request, @Res() res: Response, @UploadedFiles() AttachmentFiles?: Express.Multer.File[]) {
        try {
            const payload = req.body;
            const auth = req.user;

            payload['ImageFileName'] = AttachmentFiles[0]?.filename;

            const result = await this.complaintService.createComplaint(payload, auth);

            return ResponseFormatter.response(result, res);
        } catch (err) {
            Logger.error(err);
            return ResponseFormatter.responseWithErrorMessage(err.response.message, res);
        }
    }

    @Put(':ID')
    async updateByID(@Req() req: Request, @Res() res: Response) {
        try {
            const payload = {
                ID: req.params['ID'],
                ...req.body,
            };

            const result = await this.complaintService.updateComplaintByID(payload);

            return ResponseFormatter.response(result, res);
        } catch (err) {
            Logger.error(err);
            return ResponseFormatter.responseWithErrorMessage(err.response.message, res);
        }
    }
}
