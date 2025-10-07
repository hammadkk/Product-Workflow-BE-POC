import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import config from 'config';
import { Filter } from '@zdp-pim/zdp-filter';
import { DataSourceOptions } from 'typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: config.get<string>('dbConfigurationProduct.host'),
    port: config.get<number>('dbConfigurationProduct.port'),
    username: config.get<string>('dbConfigurationProduct.username'),
    password: config.get<string>('dbConfigurationProduct.password'),
    database: config.get<string>('dbConfigurationProduct.database'),
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
      __dirname + '/../**/*.view{.ts,.js}',
      Filter,
    ],
    migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
    synchronize: config.get<boolean>('dbConfigurationProduct.synchronize'),
    logging: true,
    ssl: config.get<boolean>('dbConfigurationProduct.ssl.enabled')
      ? {
          rejectUnauthorized: config.get<boolean>(
            'dbConfigurationProduct.ssl.rejectUnauthorized',
          ),
        }
      : false,
    schema: config.has('dbConfigurationProduct.schemaMetadata')
      ? config.get<string>('dbConfigurationProduct.schemaMetadata')
      : undefined,
  }),
};

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: config.get<string>('dbConfigurationProduct.host'),
  port: config.get<number>('dbConfigurationProduct.port'),
  username: config.get<string>('dbConfigurationProduct.username'),
  password: config.get<string>('dbConfigurationProduct.password'),
  database: config.get<string>('dbConfigurationProduct.database'),
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}',
    __dirname + '/../**/*.view{.ts,.js}',
    Filter,
  ],
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  synchronize: config.get<boolean>('dbConfigurationProduct.synchronize'),
  logging: true,
  ssl: config.get<boolean>('dbConfigurationProduct.ssl.enabled')
    ? {
        rejectUnauthorized: config.get<boolean>(
          'dbConfigurationProduct.ssl.rejectUnauthorized',
        ),
      }
    : false,
  schema: config.has('dbConfigurationProduct.schemaMetadata')
    ? config.get<string>('dbConfigurationProduct.schemaMetadata')
    : undefined,
};
