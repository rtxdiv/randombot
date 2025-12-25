import { Module } from '@nestjs/common';
import { PanelService } from './panel.service';
import { PanelController } from './panel.controller';
import { MemoryStoreModule } from 'src/memory-store/memory-store.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admins } from 'src/entity/admins.entuty';
import { BotModule } from 'src/bot/bot.module';

@Module({
  imports: [
    MemoryStoreModule,
    TypeOrmModule.forFeature([Admins]),
    BotModule
  ],
  controllers: [PanelController],
  providers: [PanelService]
})
export class PanelModule {}
