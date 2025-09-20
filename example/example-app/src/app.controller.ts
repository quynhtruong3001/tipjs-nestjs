import { Controller, Get, Query, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Controller()
@UseInterceptors(TimeInterceptor)
// @UsePipes(ValidatePipe)
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/api/cr7')
  // @UseInterceptors(TimeInterceptor)
  getInfoCR7(): string {
    return 'Hello CR7!';
  }

  @Get('/api/m10')
  // @UseGuards(LoginGuard)
  getInfoM10(): string {
    return 'Hello Messi!';
  }

  @Get('/api/getnumber')
  @UseFilters(TestFilter)
  getNumber(@Query('age', ValidatePipe) num: number) {
    console.log('result --> ', num);
    return num + 10;
  }
}
