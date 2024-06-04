import { NextApiRequest, NextApiResponse } from 'next';
import { withGodModePrivilegesApi } from './withAppAdminPrivilegesApi';

const ImpersonateUser = async (req: NextApiRequest, res: NextApiResponse, supabaseAdmin: any) => {

  let { userId } = req.query;
  console.log("🚀 ~ file: [userId].tsx:13 ~ userId", userId)

  if (typeof userId === 'string') {
    // Check if userId is email, if so, get the userId from the email
    if (userId.includes('@')) {
      const { data: userByEmail, error: userByEmailError } = await supabaseAdmin
        .from('users') // this is a supabase view, to access auth.users
        .select('id')
        .eq('email', userId)
        .single();

      console.log("🚀 ~ file: [userId].tsx:24 ~ userByEmail:", userByEmail)
      console.log("🚀 ~ file: [userId].tsx:25 ~ userByEmailError:", userByEmailError)

      if (userByEmailError)
        return res.status(400).json({ error: 'Invalid userId ' + userByEmailError.message });

      if (userByEmail) {
        userId = userByEmail.id;
        console.log("🚀 ~ file: [userId].tsx:32 ~ userId", userId)
      }
    }

    if (userId == "admin") {
      // Hardcoded admin userId
      userId = "cea45479-d3ad-4bac-a31e-d50fecedbd26"
    }

    const response = await supabaseAdmin.auth.admin.getUserById(userId as string);
    const { data: user, error: userError } = response;

    if (userError)
      return res.status(400).json({ error: 'Invalid userId ' + userError.message });

    const generateLinkResponse = await supabaseAdmin.auth.admin.generateLink({
      email: user.user.email as string,
      type: 'magiclink'
    });

    const { data: generateLinkData, error: generateLinkError } = generateLinkResponse;
    console.log("🚀 ~ file: [userId].tsx:28 ~ generateLinkData:", generateLinkData)

    if (generateLinkError)
      return res.status(400).json({ error: 'Invalid userId ' + generateLinkError.message });

    // change the origin of the link to the site url
    const { properties: { hashed_token } } = generateLinkData;

    const tokenHash = hashed_token;
    const searchParams = new URLSearchParams({
      token_hash: tokenHash,
      next: '/ai-voice-generator',
      // email: user.user.email as string,
    });

    const protocol = process.env.NODE_ENV === 'production' ? 'https://' : 'http://';
    const checkAuthUrl = new URL(`${protocol}${req.headers.host}/`);
    checkAuthUrl.pathname = `/auth/confirm`;
    checkAuthUrl.search = searchParams.toString();

    console.log("🚀 ~ file: [userId].tsx:67 ~ checkAuthUrl", checkAuthUrl.toString())

    res.writeHead(302, { Location: checkAuthUrl.toString() });
    res.end();

  } else {
    res.status(400).json({ error: 'Invalid userId' });
  }
};

export default withGodModePrivilegesApi(ImpersonateUser);
