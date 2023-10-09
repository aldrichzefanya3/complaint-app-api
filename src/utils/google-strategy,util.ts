import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

import { UserInterface } from 'src/interfaces/user.interface';
import { OAuthService } from 'src/modules/oauth/oauth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        @Inject('OAUTH_SERVICE')
        private readonly oAuthService: OAuthService,
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URL,
            scope: ['profile', 'email'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        const responsePayload: UserInterface = {
            FirstName: profile._json.given_name,
            LastName: profile._json.family_name,
            Email: profile._json.email,
            GoogleID: profile.id,
            GoogleResponse: JSON.stringify(profile),
        };

        const user = await this.oAuthService.loginThirdParty(responsePayload);

        return done(null, user);
    }
}
