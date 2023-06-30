import { Injectable } from '@nestjs/common';
import { supabase } from './supabase.service';

@Injectable()
export class SearchService {
  async search(query: string) {
    const { data: users } = await supabase
      .from('users')
      .select()
      .ilike('name', `%${query}%`);

    const { data: teams } = await supabase
      .from('teams')
      .select()
      .ilike('name', `%${query}%`);

    const { data: cases } = await supabase
      .from('cases')
      .select()
      .or('case_name.ilike.%' + query + '%,case_detail.ilike.%' + query + '%');

    const { data: activities } = await supabase
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
