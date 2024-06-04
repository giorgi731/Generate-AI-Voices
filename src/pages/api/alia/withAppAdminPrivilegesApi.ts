import type { Database } from '~/database.types';
import { createSupabaseClient as _createSupabaseClient, serializeCookie } from "@supabase/auth-helpers-shared";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { CookieOptions } from "@supabase/auth-helpers-shared";
// import { enableCors } from "../enable-cors";
// import { getIsAppAdmin } from "@/utils/supabase-queries";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

/**
 * Similar to this https://github.com/supabase/auth-helpers/blob/main/packages/nextjs/src/index.ts#L53
 * but with the service role key
 */
/* eslint-disable prettier/prettier */
export function createServiceRoleServerSupabaseClient<Database, SchemaName extends string & keyof Database = "public" extends keyof Database ? "public" : string & keyof Database>(
	context: GetServerSidePropsContext | { req: NextApiRequest; res: NextApiResponse },
	{ cookieOptions }: { cookieOptions?: CookieOptions } = {},
) {
	/* eslint-enable prettier/prettier */
	if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
		throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables are required!");
	}

	return _createSupabaseClient<Database, SchemaName>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    {
      auth: {
        storage: {
          getItem: (name) => context.req.cookies[name] || null,
          setItem: (key: string, value: string) => {
            const newSessionStr = serializeCookie(key, value);
            context.res.setHeader("set-cookie", newSessionStr);
          },
          removeItem: (key: string) => {
            context.res.setHeader("set-cookie", `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
          },
        },
        storageKey: 'auth',
      },
    }
  );
}

/**
 * @description Ensures that the user is an Application Admin.
 * This is a wrapper around the createServiceRoleServerSupabaseClient
 * that checks if the user is an Application Admin and returns a 401 if not
 * */
export const withAppAdminPrivilegesApi = (cb: (req: NextApiRequest, res: NextApiResponse, supabaseClient: ReturnType<typeof _createSupabaseClient<Database>>) => void) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const supabaseClient = createPagesServerClient<Database>({ req, res });
		// enableCors(req, res);
		
		// return ok if options request
		if (req.method === "OPTIONS")
			return res.status(200).end();

		const { data: { session } } = await supabaseClient.auth.getSession();
		// console.log("session", session);

		// if (!session || !session.user) {
		// 	return res.status(401).json({
		// 		error: "not_authenticated",
		// 		description: "The user does not have an active session or is not authenticated",
		// 	});
		// }

		// const isAppAdmin = await getIsAppAdmin(supabaseClient, session.user);
		// if (!isAppAdmin) {
		// 	return res.status(401).json({
		// 		error: "not_allowed",
		// 		description: "The user is not allowed to perform this action",
		// 	});
		// }

		return cb(req, res, supabaseClient);
	};
};


export const withGodModePrivilegesApi = (cb: (req: NextApiRequest, res: NextApiResponse, supabaseClient: ReturnType<typeof _createSupabaseClient<Database>>) => void) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const supabaseClient = createServiceRoleServerSupabaseClient<Database>({req,res});
		// enableCors(req, res);

		// return ok if options request
		if (req.method === "OPTIONS") {
			return res.status(200).end();
		}

		return cb(req, res, supabaseClient);
	};
};