//TODO: Implement dynamic blog routes
// import { allBlogs } from 'contentlayer/generated';
// import { competitorList } from '@/constants';
// import { groq } from 'next-sanity';
// import { client } from '@/lib/blog/sanity.client';

// async function fetchAllBlogPosts() {
//   const query = groq`*[_type=='post']
//     {
//       slug,
//       publishedAt
//     }`;

//   const slugs = await client.fetch(query);
//   const slugRoutes = slugs.map((slug) => {
//     return {
//       slug: slug.slug.current,
//       publishedAt: slug.publishedAt,
//     };
//   });
//   return slugRoutes;
// }

export default async function sitemap() {
  // const allBlogPosts = (await fetchAllBlogPosts()).map(
  //   (post: { slug: string; publishedAt: string }) => ({
  //     url: `https://www.revocalize.ai/blog/${post.slug}`,
  //     lastModified: post.publishedAt.split('T')[0],
  //   })
  // );

  // const allCompetitors = competitorList.map((competitor) => ({
  //   url: `https://www.revocalize.ai/${competitor.name.toLowerCase()}-alternative`,
  //   lastModified: new Date().toISOString().split('T')[0],
  // }));

  const routes = [
    '',
    '/affiliate',
    '/ai-audio-plugin',
    '/ai-mastering-online',
    '/ai-voice-cloning',
    '/ai-voice-generator',
    '/voice-library',
    '/api',
    '/create-ai-voice',
    '/download-audio-plugin',
    '/password-reset',
    '/pricing',
    '/privacy-policy',
    '/sign-in',
    '/sign-up',
    '/terms-of-service',
  ].map((route) => ({
    url: `https://www.revocalize.ai${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes,
    //  ...allCompetitors, ...allBlogPosts
    ];
}
