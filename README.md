# Next.js | prisma | next auth | tailwindcss

This is a template for all future applications of yaroofie.

```bash
node -v
# v18.18.0
pnpm -v
# 9.7.0
```

## install dependencies

```bash
pnpm i
```

## dev server

```bash
pnpm run dev
# or F5 key of keyboard
```

## prisma studio

```bash
npx prisma studio
```

## prisma migrations

use this after database model change to update the database

```bash
npx prisma migrate dev --name migration-name
```

## prisma update client schema

```bash
npx prisma generate
```
