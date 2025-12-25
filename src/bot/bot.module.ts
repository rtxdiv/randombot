import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './bot.update';
import { MemoryStoreModule } from 'src/memory-store/memory-store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admins } from 'src/entity/admins.entuty';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: process.env.BOT_TOKEN || '',
        include: [BotModule]
      }),
    }),
    MemoryStoreModule,
    TypeOrmModule.forFeature([Admins])
  ],
  providers: [BotService, BotUpdate],
})
export class BotModule {}
