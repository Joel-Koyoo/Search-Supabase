import { Module } from '@nestjs/common';
import { SearchService } from './search/search.service';
import { ConfigModule } from '@nestjs/config';
import {
  configurations,
  configurationsValidator,
} from './common/config/configurations';
import * as path from 'path';
import { SupabaseModule } from './supabase/supabase.module';
import { SearchModule } from './search/search.module';

const currentDir: string = __dirname;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(
        currentDir,
        `../.env/.env.${process.env.NODE_ENV || 'development'}`,
      ),
      load: [configurations],
      validationSchema: configurationsValidator,
    }),
    SupabaseModule,
    SearchModule,
  ],
  providers: [SearchService],
})
export class AppModule {}
