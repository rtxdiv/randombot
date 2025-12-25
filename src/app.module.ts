import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MemoryStoreModule } from './memory-store/memory-store.module';
import { PanelModule } from './panel/panel.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admins } from './entity/admins.entuty';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 4001,
      username: 'user',
      password: 'password',
      database: 'randombot',
      entities: [Admins]
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'public')
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MemoryStoreModule,
    PanelModule,
    BotModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
