import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add middleware global
  app.use(function(req: Request, res: Response, next: NextFunction) {
    console.log('before app>>', req.url);
    next();
    console.log('after app>>');
  });

  // add global guard
  // app.useGlobalGuards(new LoginGuard());
  // app.useGlobalInterceptors(new TimeInterceptor());
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
