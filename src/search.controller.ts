import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller()
export class AppController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/search')
  async search(@Query('q') query: string) {
    return this.searchService.search(query);
  }
}
