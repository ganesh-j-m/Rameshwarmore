# rameshwarmore.in

Official personal-brand website and admin CMS for **Rameshwar Parmeshwar More** —
Kirtankar, Speaker, Researcher & Social Contributor.

Built with Next.js 14 (App Router, TypeScript), Tailwind CSS, PostgreSQL + Prisma,
and JWT-based admin authentication.

All public-facing content ships pre-loaded with only the **verified biodata**
supplied for Rameshwar More (see `src/lib/data/verified-biodata.ts`). Nothing is
invented. Anything not yet confirmed (testimonials, extra gallery photos, blog
posts, etc.) is left empty with an honest "content will be updated soon" state
until Rameshwar or an admin adds it through the CMS.

---

## 1. Tech stack

| Layer          | Choice                                              |
|-----------------|------------------------------------------------------|
| Framework       | Next.js 14 (App Router, Server Components, Server Actions) |
| Language        | TypeScript                                          |
| Styling         | Tailwind CSS (custom "tradition + culture" palette) |
| Database        | PostgreSQL                                          |
| ORM             | Prisma                                              |
| Auth            | Custom JWT sessions (`jose`) + `bcryptjs`, HTTP-only cookies |
| Media           | Cloudinary (images), YouTube embeds (videos)        |
| Validation      | Zod                                                 |
| Deployment      | Vercel                                              |

---

## 2. Local setup

### 2.1 Prerequisites
- Node.js 18.18+ (Node 20 LTS recommended)
- A PostgreSQL database — any of these work and have free tiers:
  - [Neon](https://neon.tech)
  - [Supabase](https://supabase.com)
  - [Railway](https://railway.app)
  - or a local Postgres install

### 2.2 Install dependencies
```bash
npm install
```
This also runs `prisma generate` automatically via the `postinstall` script.

### 2.3 Configure environment variables
```bash
cp .env.example .env
```
Then fill in `.env`:
- `DATABASE_URL` — your Postgres connection string
- `AUTH_SECRET` — a long random string, e.g. `openssl rand -base64 32`
- `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` — used once by the seed script
  to create the first admin login. **Change the password immediately after
  your first login.**
- Cloudinary keys — optional locally, required for image uploads in the admin
  panel. Create a free account at cloudinary.com and an **unsigned** upload
  preset for `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.

### 2.4 Set up the database
```bash
npm run db:push      # creates all tables from prisma/schema.prisma
npm run db:seed      # loads verified biodata + creates the first admin user
```

### 2.5 Run the dev server
```bash
npm run dev
```
Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin/login` for the admin panel (use the
`ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `.env`).

---

## 3. Editing content

Everything listed in the admin sidebar (Profile, Education, Research, Awards,
Events, Gallery, Videos, Lectures, Certifications, Social Work, Blog,
Testimonials, Contact Inquiries, Site Settings) is editable **without touching
code** — changes save straight to Postgres and appear on the live site on next
page load (most sections revalidate every 60 seconds; you can force an
immediate refresh by re-saving from the admin panel).

If you ever need to change the seed content itself (e.g. correcting a fact),
edit `src/lib/data/verified-biodata.ts` and re-run `npm run db:seed` — it's
safe to re-run and will not duplicate the admin user.

---

## 4. Production deployment (Vercel)

1. Push this repository to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Add all variables from `.env.example` in **Project Settings → Environment
   Variables** (use your production `DATABASE_URL`, a fresh `AUTH_SECRET`,
   and your Cloudinary credentials).
4. Deploy. Vercel runs `npm install` → `prisma generate` → `next build`
   automatically.
5. After the first successful deploy, run the database migration + seed once
   against your production database:
   ```bash
   DATABASE_URL="your-production-url" npm run db:push
   DATABASE_URL="your-production-url" npm run db:seed
   ```
6. In Vercel → **Settings → Domains**, add `rameshwarmore.in` and
   `www.rameshwarmore.in`, and set the `www` version to redirect to the
   apex (or vice versa) — pick one canonical domain.
7. Submit the site to **Google Search Console**, verify ownership, and submit
   `https://rameshwarmore.in/sitemap.xml` (generated automatically by
   `src/app/sitemap.ts`).

### Backups
Vercel does **not** back up your database. Use your Postgres provider's
built-in backup feature (Neon and Supabase both offer automatic daily
backups/point-in-time restore on paid tiers) and export Cloudinary media
periodically via their Admin API or dashboard.

---

## 5. Project structure

```
prisma/
  schema.prisma        All 20+ models: Profile, Education, ResearchProject,
                        Publication, JourneyItem, Award, Event, Lecture,
                        Workshop, GalleryAlbum, GalleryImage, Video,
                        SocialWork, BlogPost, Testimonial, Certification,
                        ContactInquiry, AdminUser, ActivityLog, SiteSetting,
                        SocialLink
  seed.ts               Loads verified-biodata.ts into the database

src/
  app/                  Public pages + /admin CMS + /api routes
  components/           Site chrome (Header, Footer) + admin UI + shared UI
  lib/
    data/verified-biodata.ts   Single source of truth for real facts
    auth.ts              JWT session helpers
    prisma.ts            Prisma client singleton
    rate-limit.ts         In-memory rate limiter (contact form, login)
    validations.ts        Zod schemas
  middleware.ts          Protects /admin/* routes
```

---

## 6. A note on this build

This project was verified in a sandboxed build environment with restricted
internet access, so two things could not be fully exercised end-to-end here
and are worth double-checking the first time you build it yourself:

- **`prisma generate`** needs to download its query-engine binary from
  `binaries.prisma.sh` — blocked in the sandbox, but this is a completely
  standard step that runs automatically via `postinstall` the moment you
  `npm install` on your own machine or on Vercel.
- **Google Fonts** (`Noto Serif Devanagari` + `Inter`, loaded via
  `next/font/google` in `src/app/layout.tsx`) are fetched and self-hosted at
  build time — also blocked in the sandbox, but this will resolve normally
  anywhere with regular internet access.

Everything else — all TypeScript, all page/component code, ESLint — was
installed and verified clean in that same sandbox.
