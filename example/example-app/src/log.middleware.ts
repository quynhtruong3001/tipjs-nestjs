import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`[${new Date().toISOString()}] | [Start Log 3] -> `, req.url);
    next();
    console.log(`[${new Date().toISOString()}] | [End Log 4] -> `, req.url);
  }
}
