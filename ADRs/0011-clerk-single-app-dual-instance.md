# ADR-0011: Clerk Single-App Dual-Instance Pattern

**Status:** Accepted
**Date:** 2026-05-12
**Deciders:** Scott Nakagawa (MI Founder / Curriculum Architect)

## Context

The Academy uses Clerk for authentication. The production Clerk application is already configured and serving live users. With the introduction of a staging environment (ADR-0010), we need authentication for staging without disrupting production.

Three options were considered:

1. **Create a separate Clerk application for staging.** This would produce a third Clerk app (alongside the existing production one), with its own user pool, API keys, and configuration. Staging users would not exist in production and vice versa.
2. **Use Clerk's built-in development instance.** Every Clerk application has two instances: a production instance and a development instance. They share the same dashboard configuration but have separate user pools and API keys. The development instance is free and designed for exactly this use case.
3. **Share the production Clerk instance for staging.** Staging would use production API keys. This is the simplest option but means staging writes (user creation, session management) hit the production user pool.

## Decision

**Use Clerk's single-app dual-instance pattern. The production instance serves production. The development instance serves staging.**

### Configuration

| Environment | Clerk Instance | Publishable Key Source | Users |
|-------------|---------------|----------------------|-------|
| Production | Production instance | `VITE_CLERK_PUBLISHABLE_KEY` (prod value) | Real learners, SanMar users |
| Staging | Development instance | `VITE_CLERK_PUBLISHABLE_KEY` (dev value) | Test accounts only |

### JWT integration with Supabase

Both instances use the same JWT template configuration (Clerk dashboard > JWT Templates). The `sub` claim contains the Clerk user ID, which is consumed by `mosaic_clerk_sub()` in Supabase RLS policies. Since staging and production have separate Supabase projects (ADR-0010), there is no cross-contamination — a staging JWT only authenticates against the staging database.

The Clerk JWT signing keys differ between instances. Each Supabase project must be configured with the correct JWT secret for its corresponding Clerk instance.

### No third Clerk application

We explicitly reject creating a third Clerk app for staging. Clerk's dual-instance model is purpose-built for dev/prod separation within a single app. A third app would:

- Triple the configuration surface (JWT templates, social providers, webhook endpoints).
- Create user pool fragmentation with no benefit.
- Increase the chance of configuration drift between environments.

## Consequences

### Positive

- Zero additional Clerk cost (development instances are free).
- Single dashboard for both instances — configuration changes propagate naturally.
- Clear separation: production users never appear in staging, and test accounts never appear in production.
- JWT template changes are made once and apply to both instances.

### Negative

- Developers must track which Clerk API keys correspond to which environment. The `.env.example` files in both `proving-ground` and `milsspath` document this.
- If Clerk changes their dual-instance behavior in a future release, both environments are affected simultaneously.

### Risks

- Accidentally deploying staging with production Clerk keys (or vice versa) would cause authentication to succeed against the wrong user pool. The Vercel environment variable configuration and CI/CD environment separation mitigate this.
