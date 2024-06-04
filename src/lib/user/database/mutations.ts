import type { SupabaseClient } from '@supabase/supabase-js';
import type UserData from '~/core/session/types/user-data';
import { ORGANIZATIONS_TABLE, USERS_TABLE } from '~/lib/db-tables';

/**
 * @name updateUserData
 * @param client
 * @param id
 * @param data
 */
export function updateUserData(
  client: SupabaseClient,
  { id, ...data }: WithId<Partial<UserData>>
) {
  return client
    .from(USERS_TABLE)
    .update({
      display_name: data.displayName,
      photo_url: data.photoUrl,
      // user_name: data.userName
    })
    .match({ id })
    .throwOnError();
}

export async function topUpUserBalance(
  client: SupabaseClient,
  { id, ...data }: WithId<Partial<UserData>>
) {
  // Fetch the current balance from the database
  const { data: user } = await client
    .from(USERS_TABLE)
    .select('balance')
    .match({ id })
    .single();

  // Calculate the updated balance
  const updatedBalance = user?.balance + data.balance;

  // Update the balance in the database
  await client
    .from(USERS_TABLE)
    .update({ balance: updatedBalance })
    .match({ id })
    .throwOnError();

  // Return the updated balance
  return updatedBalance;
}

export async function deductOrganizationBalance(
  client: SupabaseClient,
  { id, ...data }: WithId<any>
) {
  // Fetch the current balance from the database
  const { data: user } = await client
    .from(ORGANIZATIONS_TABLE)
    .select('credits')
    .match({ id })
    .single();

  // Calculate the updated balance
  const updatedBalance = user?.credits - data.balance;

  // Update the balance in the database
  await client
    .from(ORGANIZATIONS_TABLE)
    .update({ credits: updatedBalance })
    .match({ id })
    .throwOnError();

  // Return the updated balance
  return updatedBalance;
}

export async function deductOrganizationSlots(
  client: SupabaseClient,
  { id, ...data }: WithId<any>
) {
  // Fetch the current balance from the database
  const { data: user } = await client
    .from(ORGANIZATIONS_TABLE)
    .select('slots')
    .match({ id })
    .single();

  // Calculate the updated balance
  const updatedBalance = user?.slots - data.slots;

  // Update the balance in the database
  await client
    .from(ORGANIZATIONS_TABLE)
    .update({ slots: updatedBalance })
    .match({ id })
    .throwOnError();

  // Return the updated balance
  return updatedBalance;
}

export async function addOrganizationSlots(
  client: SupabaseClient,
  { id, ...data }: WithId<any>
) {
  // Fetch the current balance from the database
  const { data: user } = await client
    .from(ORGANIZATIONS_TABLE)
    .select('slots')
    .match({ id })
    .single();

  // Calculate the updated balance
  const updatedBalance = Number(user?.slots) + Number(data.slots);

  // Update the balance in the database
  await client
    .from(ORGANIZATIONS_TABLE)
    .update({ slots: updatedBalance })
    .match({ id })
    .throwOnError();

  // Return the updated balance
  return updatedBalance;
}

/**
 * @name createUser
 * @param client
 * @param data
 */
export async function createUser(client: SupabaseClient, data: UserData) {
  return client.from(USERS_TABLE).insert(data).throwOnError();
}
