import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { LogsModule } from './logs/logs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configurations';
import { SequelizeModule} from "@nestjs/sequelize";
import { User } from './users/models/users.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        ssl: true,
        dialectOptions: {
          ssl: true && {
            require: true,
          },
        },
        synchronize: true,
        autoLoadModels: true,
        models: [User]
      })
    }),
    UsersModule,
    RolesModule,
    LogsModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
