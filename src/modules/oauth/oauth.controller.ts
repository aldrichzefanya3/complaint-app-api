import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { GoogleJWTGuard } from 'src/utils/guards.util';
import { ResponseFormatter } from 'src/utils/response.util';

@Controller('oauth')
export class OAuthController {
    @Get('google/login')
    @UseGuards(GoogleJWTGuard)
    async handleLogin(@Res() res: Response) {
        return ResponseFormatter.response('Google Authentication', res);
    }

    @Get('google/redirect')
    @UseGuards(GoogleJWTGuard)
    async handleRedirect(@Req() req: Request, @Res() res: Response) {
        return ResponseFormatter.response(req.user, res);
    }
}
