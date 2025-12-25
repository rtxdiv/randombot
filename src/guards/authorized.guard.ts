import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { Response, Request } from 'express';
import { MemoryStore } from 'src/memory-store/memory-store.service';

@Injectable()
export class AuthorizedGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>()
    const res = context.switchToHttp().getResponse<Response>()
    const memoryStore = new MemoryStore()

    const password = req.cookies?.password

    if (memoryStore.checkPassword(password)) {
      res.cookie('password', password, { maxAge: 24 * 60 * 60 * 1000 })
      return true
    }

    res.cookie('password', '', { maxAge: 0 })
    res.redirect('/auth')
    return false
  }
}
