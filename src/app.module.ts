import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './databases/database.module';
import { ComplaintModule } from './modules/complaint/complaint.module';
import { OAuthModule } from './modules/oauth/oauth.module';

@Module({
    imports: [
        PassportModule.register({ session: true, defaultStrategy: 'google' }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: '3600s',
            },
        }),
        ServeStaticModule.forRoot({
            serveRoot: '/public/attachments',
            rootPath: join(__dirname, '..', '/public/attachments'),
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            cache: false,
        }),
        DatabaseModule,
        OAuthModule,
        ComplaintModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
