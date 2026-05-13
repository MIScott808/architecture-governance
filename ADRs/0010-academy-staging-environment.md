# ADR-0010: Academy Staging Environment

**Status:** Accepted
**Date:** 2026-05-12
**Deciders:** Scott Nakagawa (MI Founder / Curriculum Architect)

## Context

The Academy operates a production Supabase project (`fmnesvogtfjbcevunmyd`, project name `mana-academy`) serving ~23 SanMar Corporation users plus broader Academy learners at `milsspath.vercel.app`. Schema changes to this database carry real risk — a failed migration could disrupt active learners.

Prior to this decision, migrations were applied directly to production by Lovable's Supabase integration or manually via the SQL Editor. There was no staging environment for pre-flight validation.

The `manaolana-academy-migrations` repo introduces a CI/CD pipeline that needs a safe target for automated testing before production promotion.

## Decision

**Create a dedicated `academy-staging` Supabase project as the pre-production validation environment.** All migrations deploy to staging first. Production deployment is gated behind a manual approval step.

### Environment topology

| Environment | Supabase Project | Vercel Target | Purpose |
|-------------|-----------------|---------------|---------|
| Staging | `academy-staging` | `*-staging.manaolana-international.com` | Migration validation, integration testing, Lovable dev |
| Production | `mana-academy` (`fmnesvogtfjbcevunmyd`) | `milsspath.vercel.app`, `provingground.manaolana-international.com` | Live learners |

### Pipeline flow

1. PR merged to `main` in `manaolana-academy-migrations`.
2. CI applies all pending migrations to `academy-staging`.
3. Verify scripts run against staging.
4. If staging passes, production deploy is queued in the `production` GitHub Environment.
5. @MIScott808 reviews staging results and manually approves production deployment.
6. CI applies migrations to production.
7. Types are regenerated from production and committed.

### Staging data policy

- Staging starts empty and accumulates test data over time.
- Staging is never seeded from production (no PII transfer).
- Staging may be reset (wiped and re-migrated) at any time without notice.
- Test accounts on staging use Clerk development instance credentials (see ADR-0011).

## Consequences

### Positive

- Every migration is validated against a real Supabase project before touching production.
- Lovable can develop against staging without risking production data.
- The approval gate ensures a human reviews staging results before production promotion.

### Negative

- Adds a second Supabase project to maintain (billing, access management).
- Staging may drift from production if manual SQL is applied to either environment outside the pipeline. The runbook explicitly prohibits ad-hoc DDL.

### Risks

- If staging's schema diverges from production (e.g., a migration is manually reverted on staging but not production), the pipeline may produce false confidence. The verify scripts and PR template's production audit requirement mitigate this.
