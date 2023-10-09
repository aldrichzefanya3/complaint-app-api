import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASS'),
                    database: configService.get('DB_NAME'),
                    entities: [join(__dirname, '../entities/*.entity.{ts,js}')],
                    synchronize: false,
                    logging: false,
                    cli: {
                        entitiesDir: 'src/entities',
                    },
                    maxQueryExecutionTime: 1000,
                } as TypeOrmModuleAsyncOptions;
            },
        }),
    ],
})
export class DatabaseModule {}
