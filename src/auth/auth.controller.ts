import { BadRequestException, Body, Controller, Get, Post, Res, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { MemoryStore } from 'src/memory-store/memory-store.service';
import type { Response, Request } from 'express';
import path from 'path';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly memoryStore: MemoryStore) {}

  @Get()
  getAuthPage(@Req() req: Request, @Res() res: Response) {
    if (req.cookies.password) {
      return res.redirect('/panel')
    }
    res.sendFile(path.join(process.cwd(), 'public', 'auth.html'))
  }

  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @Post('tryPassword')
  auth(@Body() body: AuthDto, @Res() res: Response) {

    if (this.memoryStore.checkPassword(body.password)) {
      res.cookie('password', body.password, { maxAge: 24 * 60 * 60 * 1000 })
      res.redirect('/panel')
    }
    throw new BadRequestException(['Неверный пароль'])
  }
}
