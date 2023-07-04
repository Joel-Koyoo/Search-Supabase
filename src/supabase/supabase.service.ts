import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private readonly _url: string;
  private readonly _anonApiKey: string;

  constructor(private readonly _config: ConfigService) {
    this._url = this._config.get('supabase.url');
    this._anonApiKey = this._config.get('supabase.anonApiKey');
  }

  public createClient() {
    const supabaseClient = createClient(this._url, this._anonApiKey, {
      auth: {
        persistSession: false,
      },
    });
    return supabaseClient;
  }
}
