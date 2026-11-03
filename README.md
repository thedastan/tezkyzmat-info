This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## Deploy on Netlify

The deployment settings are defined in `netlify.toml`. Netlify runs `npm run build`
and uses `@netlify/plugin-nextjs` to adapt the `.next` output into static assets,
server functions, and routing rules. The plugin is explicitly enabled so deployment
does not depend on automatic framework detection.

Do not upload `.next` directly as a static site: its HTML lives under internal
paths such as `server/app/ru.html`, and it does not include the deployed handlers
needed for localized routes, middleware, or dynamic pages. This produces Netlify's
"Page not found" response even when the Next.js build succeeds.

After deployment, check that `/` redirects to a supported locale and that `/ru`,
`/en`, and `/kg` load. The deploy summary must include the generated Next.js
server function and routing rules.
