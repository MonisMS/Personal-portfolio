This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Social previews

`app/opengraph-image.png` is the 1200×630 site-wide card, with Monis's real
portrait, name, and role. It is a static snapshot of the former generated card,
so fetching it needs no serverless rendering, font loading, or GitHub API call.
The contribution strip in this snapshot is not live. Update the PNG and its
`opengraph-image.alt.txt` together when the profile changes.

Open Graph and Twitter metadata use absolute URLs through `metadataBase` in the
root layout. Page metadata falls back to this card; projects keep their own
cards. `/opengraph-image` redirects to the PNG for previously shared links.
Metadata streaming is disabled so unknown preview crawlers receive tags in the
initial HTML head, too.

After deployment, check the HTML with a crawler user agent and fetch its
`og:image` URL: both must return 200, and the image must be `image/png`.
Social services cache previews independently; already shared links may need a
fresh scrape using the platform's preview inspector.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
