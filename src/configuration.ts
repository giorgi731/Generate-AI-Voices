import type { Provider } from '@supabase/gotrue-js/src/lib/types';

const production = process.env.NODE_ENV === 'production';

const configuration = {
  site: {
    name: 'Revocalize AI | Clone, protect & create unique voices with AI',
    description:
      'Revocalize AI creates natural-sounding voice clones by levering proprietary AI voice synthesizing technology.',
    themeColor: '#ffffff',
    themeColorDark: '#0a0a0a',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Revocalize AI',
    twitterHandle: 'Revocalize',
    githubHandle: 'sebyddd',
    language: 'en',
    convertKitFormId: '',
    locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en-US',
  },
  auth: {
    // ensure this is the same as your Supabase project
    // by default - it's true in production and false in development
    requireEmailConfirmation: false,
    // process.env.NEXT_PUBLIC_REQUIRE_EMAIL_CONFIRMATION === 'true' || false,
    // NB: Enable the providers below in the Supabase Console
    // in your production project
    providers: {
      emailPassword: true,
      phoneNumber: false,
      emailLink: false,
      oAuth: ['google'] as Provider[],
    },
  },
  production,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
  enableThemeSwitcher: true,
  paths: {
    signIn: '/sign-in',
    signUp: '/sign-up',
    signInFromLink: '/link',
    signInMfa: '/verify',
    onboarding: `/onboarding`,
    appHome: '/ai-voice-generator',
    settings: {
      profile: '/settings/profile',
      authentication: '/settings/profile/authentication',
      email: '/settings/profile/email',
      password: '/settings/profile/password',
    },
    api: {
      checkout: `/api/stripe/checkout`,
      billingPortal: `/api/stripe/portal`,
      organizations: {
        create: `/api/organizations`,
        current: `/api/organizations/[organization]/current`,
        transferOwnership: `/api/organizations/owner`,
        members: `/api/organizations/members`,
        member: `/api/organizations/members/[member]`,
      },
    },
  },
  email: {
    host: '',
    port: 587,
    user: '',
    password: '',
    senderAddress: 'Revocalize AI <contact@revocalize.ai>',
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  stripe: {
    products: [
      {
        name: 'Free',
        stripeProductId: 'price_1O5IKuGTd5P8ZJtno4qXpY70',
        credits: 5,
        slots: 1,
        description:
          'The perfect plan for protecting your unique voice identity and trying out Revocalize AI.',
        badge: `Free`,
        features: [
          'AI Unique Voice Identity Singing Model',
          'Create up to 5 synthesized vocal recordings per month',
        ],
        plans: [
          {
            name: '',
            price: 'Free',
            stripePriceId: '',
            trialPeriodDays: 0,
            label: `Get early-access`,
            href: `/sign-up`,
          },
        ],
      },
      {
        name: 'Starter',
        stripeProductId: 'price_1O5IL3GTd5P8ZJtnpKIkwSW1',
        credits: 120,
        slots: 2,
        badge: `Most Popular`,
        recommended: true,
        description:
          'Ideal for music production, podcasting, virtual assistants, interactive storytelling, and more.',
        features: [
          'Everything from Free, plus:',
          'Create up to 50 synthesized vocal recordings per month',
          'Personalized prompts and reminders',
          'Dynamic persona creation',
        ],
        plans: [
          {
            name: 'Monthly',
            price: '$299',
            stripePriceId: 'pro-plan-mth',
            trialPeriodDays: 0,
          },
          {
            name: 'Yearly',
            price: '$3000',
            stripePriceId: 'pro-plan-yr',
            trialPeriodDays: 0,
          },
        ],
      },
      {
        name: 'Creator',
        stripeProductId: 'price_1O5IKzGTd5P8ZJtnPxZecmyV',
        credits: 300,
        slots: 5,
        description:
          'For businesses and organizations with high-volume AI voice needs.',
        features: [
          'Everything from Pro, plus:',
          'Create unlimited synthesized vocal recordings',
          'Dedicated account manager',
          '24/7 chat and phone support',
        ],
        plans: [
          {
            name: '',
            price: 'Contact us',
            stripePriceId: '',
            trialPeriodDays: 0,
            label: `Contact us`,
            href: `mailto:contact@revocalize.ai`,
          },
        ],
      },
    ],
    plugin: {
      stripeProductId: "price_1OuadmGTd5P8ZJtnoHbwxw1w",
      href: `mailto:contact@revocalize.ai`,
    }
  },
};

export default configuration;
