import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MemoryStoreModule } from 'src/memory-store/memory-store.module';

@Module({
  imports: [MemoryStoreModule],
  controllers: [AuthController]
})
export class AuthModule {}
