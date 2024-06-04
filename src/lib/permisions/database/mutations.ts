import type { SupabaseClient } from '@supabase/supabase-js';
import { USER_MODEL_PERMISIONS } from '~/lib/db-tables';
import type { Database } from '../../../database.types';

type Client = SupabaseClient<Database>;

/**
 * @param client
 * @param model
 */

export async function createPermision(client: Client, invite: Partial<any>) {
  return client.from(USER_MODEL_PERMISIONS).insert(invite).throwOnError();
}
