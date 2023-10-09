import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';

import { AppModule } from './app.module';

async function bootstrap() {
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
    });
    const app = await NestFactory.create(AppModule);

    const port = process.env.PORT;

    app.setGlobalPrefix('api/v1');

    app.enableCors({
        origin: ['*'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['*'],
    });

    app.use(
        session({
            secret: 'my-secret',
            saveUninitialized: false,
            resave: false,
            cookie: {
                maxAge: 60000,
            },
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(port);
}
bootstrap();
