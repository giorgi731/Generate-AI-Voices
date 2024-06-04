/**
 * This interface represents the user record in the Database
 * Not to be confused with {@link User} defined in Supabase Auth
 * This data is always present in {@link UserSession}
 */
interface UserData {
  id: string;
  email: string;
  photoUrl?: string;
  displayName?: string;
  onboarded: boolean;
  userName?: string;
  balance: number;
  role: string;
  api_key: string;
}

export default UserData;
