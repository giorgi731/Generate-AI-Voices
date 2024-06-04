import configuration from '~/configuration';

const Head = () => {
  const siteUrl = configuration.site.siteUrl;

  if (!siteUrl) {
    throw new Error(`Please add the property siteUrl in the configuration`);
  }

  const structuredData = {
    name: configuration.site.name,
    url: siteUrl,
    logo: `${siteUrl}/assets/images/logo/revocalize-square-logo.png`,
    '@context': 'https://schema.org',
    '@type': 'Organization', // change to person for Personal websites
  };

  return (
    <>
      <title>{configuration.site.name}</title>

      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />

      {/* <meta name="theme-color" content={configuration.site.themeColor} /> */}

      <meta
        name="description"
        content={configuration.site.description}
        key="meta:description"
      />

      <meta
        property="og:title"
        key="og:title"
        content={configuration.site.name}
      />

      <meta
        property="og:description"
        key="og:description"
        content={configuration.site.description}
      />

      <meta property="og:site_name" content={configuration.site.siteName} />
      <meta property="twitter:title" content={configuration.site.siteName} />
      <meta property="twitter:card" content="summary_large_image" />

      <meta
        property="twitter:creator"
        content={configuration.site.twitterHandle}
      />

      <script
        async
        key="ld:json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
};

export default Head;
