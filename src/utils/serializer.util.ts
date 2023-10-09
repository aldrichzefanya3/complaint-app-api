import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { User } from 'src/entities/users.entity';
import { OAuthService } from 'src/modules/oauth/oauth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('OAUTH_SERVICE')
        private readonly oAuthService: OAuthService,
    ) {
        super();
    }

    async serializeUser(user: User, done: Function) {
        done(null, user);
    }

    async deserializeUser(payload: any, done: Function) {
        const user = await this.oAuthService.getUserByID(payload.ID);

        const data = {
            ID: user.ID,
            FullName: user.FullName,
        };

        return user ? done(null, data) : done(null, null);
    }
}
