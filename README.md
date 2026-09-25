This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

After cloning, install the versioned git hooks (blocks known supply-chain
malware indicators before they can be committed — see [SECURITY.md](./SECURITY.md)):

```bash
bash scripts/setup-hooks.sh
```

Then run the development server:

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

### npm and install-time scripts

This repo ships an `.npmrc` with `ignore-scripts=true` so `npm install` and
`npm ci` do **not** run dependency install/postinstall scripts by default.
This blocks the most common supply-chain payload vector.

If a legitimate dependency actually needs its install script (rare — usually
native-code builds), run it explicitly and only for that package after
you've reviewed it:

```bash
# Rebuild native modules that need install scripts (e.g. after a Node upgrade).
npm rebuild <package>

# Run a package.json script directly (unaffected by ignore-scripts).
npm run <script>
```

## Security

If you see a warning from the pre-commit hook or the `security-scan` CI
workflow, **do not push**. See [SECURITY.md](./SECURITY.md) for the threat
description, indicators of compromise, and remediation steps.

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
