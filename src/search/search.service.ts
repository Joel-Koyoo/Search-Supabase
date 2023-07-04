import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class SearchService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async search(query: string) {
    const supabaseClient = this.supabaseService.createClient();

    const { data: users } = await supabaseClient
      .from('users')
      .select()
      .ilike('name', `%${query}%`);

    const { data: teams } = await supabaseClient
      .from('teams')
      .select()
      .ilike('name', `%${query}%`);

    const { data: cases } = await supabaseClient
      .from('cases')
      .select()
      .or('case_name.ilike.%' + query + '%,case_detail.ilike.%' + query + '%');

    const { data: activities } = await supabaseClient
      .from('activities')
      .select()
      .ilike('activity_name', `%${query}%`);

    return {
      users,
      teams,
      cases,
      activities,
    };
  }
}
