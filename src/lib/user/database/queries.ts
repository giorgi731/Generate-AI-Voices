import type UserData from '~/core/session/types/user-data';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * @name getUserById
 * @param client
 * @param userId
 */
export function getUserById(client: SupabaseClient, userId: string) {
  return client
    .from('users')
    .select<string, UserData>('*')
    .eq('id', userId)
    .throwOnError()
    .single();
}

export function setShareModel(client: SupabaseClient, owner_id: string, target_id: string, model_id: number) {
  return client
    .from('share_model')
    .insert([
      {
        model_owner: owner_id,
        shared_user: target_id,
        model_id: model_id,
      }
    ])
    .select()
}

export function getShared(client: any, modelID: any) {
  return client
    .from('share_model')
    .select(`
      id,
      shared_user,
      users!shared_user(email)
    `)
    .eq('model_id', modelID);
}

export function getUserByEmail(client: SupabaseClient, email: string) {
  return client
    .from('users')
    .select<string, any>(
      `
      id
    `
    )
    .eq('email', email)
    .throwOnError()
    .single();
}

export function deleteShared(client: SupabaseClient, sharedID : any) {
  return client
  .from('share_model')
  .delete()
  .eq('id', sharedID)
}
