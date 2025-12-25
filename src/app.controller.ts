import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request, Response } from 'express';
import { MemoryStore } from './memory-store/memory-store.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly memoryStore: MemoryStore
  ) {}

  @Get()
  getPage(@Req() req: Request, @Res() res: Response) {
    if (req.cookies.password && this.memoryStore.checkPassword(req.cookies.password)) {
      res.redirect('/panel')
    } else {
      res.redirect('/auth')
    }
  }
}
