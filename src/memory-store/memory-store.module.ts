import { Module } from '@nestjs/common';
import { MemoryStore } from './memory-store.service';

@Module({
  providers: [MemoryStore],
  exports: [MemoryStore],
})
export class MemoryStoreModule {}
