import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities/users.entity';
import { SessionSerializer } from 'src/utils/serializer.util';

import { OAuthController } from './oauth.controller';
import { OAuthService } from './oauth.service';
import { UserRepository } from '../../respositories/users.repository';
import { GoogleStrategy } from '../../utils/google-strategy,util';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [OAuthController],
    providers: [
        GoogleStrategy,
        UserRepository,
        SessionSerializer,
        {
            provide: 'OAUTH_SERVICE',
            useClass: OAuthService,
        },
        JwtService,
    ],
})
export class OAuthModule {}
