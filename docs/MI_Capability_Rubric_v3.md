# MI Capability Rubric v3

**Status:** Active source register
**Verified:** August 2026
**Re-verification cadence:** Quarterly
**System of record:** `public.cns_level_criteria` on **mana-academy** (`fmnesvogtfjbcevunmyd`)
**Rendered in:** HOKU → [/rubric](https://hoku.manaolana-international.com/rubric)

---

## What this register is

Four Mana'olana levels crossed with six disciplines: twenty-four cells, each
recording what actually earns that level in that discipline.

**A level is an MI designation, not a credential.** Each cell names the
external credential the level is *anchored* to, so the bar can be traced to a
published standard rather than asserted. Where no external standard exists at
the right altitude — the Lead tier in several disciplines — the cell says so,
and the bar is MI judgment.

> Levels are MI designations anchored to external credentials; demonstrated
> capability may substitute at the Principal's discretion. Source register:
> MI_Capability_Rubric_v3 (architecture-governance). Verified Aug 2026;
> quarterly re-verification.

### Levels and rates

| Level | Rate |
|---|---|
| Associate | $45/hr |
| Practitioner | $65/hr |
| Senior | $90/hr |
| Lead | $120/hr |

Rates live in `cns_levels` and are the same across every discipline — the
discipline changes what earns the level, not what the level pays.

### The three fields, and why they are separate

- **Credential anchor** — the external certification this level is pegged to,
  with its own eligibility conditions stated. This is the traceable part.
- **Experience threshold** — the practice behind the credential. A credential
  with no experience requirement (ECBA, CAPM, TOC Fundamentals) still sits at
  Associate because the threshold, not the exam, sets the tier.
- **Demonstrated capability** — what the person can actually do unsupervised.
  This is what may substitute for the anchor at the Principal's discretion.

**Verification** names where the external requirement was checked. A cell
without one is MI judgment and should be read as such.

### How this document relates to the database

`cns_level_criteria` is the system of record; this file is its rendering,
generated from the live table on 2026-08-17 so the governance repo holds a
reviewable copy under version control. Edits are made to the table through
Architecture and this document is regenerated — do not edit the tables below
and expect the change to reach HOKU.

Read access is open to any signed-in HOKU account. Writes are gated behind
`cns_is_admin()`, and `anon` holds no privilege on the table at all.

Captured in the migrations repo as
`migrations/20260817090001_cns_level_criteria.sql`.

---

## The matrix

| Discipline | Associate | Practitioner | Senior | Lead |
|---|---|---|---|---|
| Project Management | CAPM | PMP-eligible / newly PMP | PMP | PgMP |
| Business Analysis | ECBA | CCBA | CBAP | CBAP + strategic record |
| Change Management | Prosci CCP | CCMP-eligible | CCMP | ACMP MCMP |
| Lean Six Sigma | MI Yellow Belt | MI Green Belt / CSSGB | ASQ CSSBB | ASQ MBB |
| Enterprise Architecture | TOGAF EA Foundation | TOGAF EA Practitioner | TOGAF Applied Practitioner | TOGAF EA Leader |
| Theory of Constraints | TOCFC | TOCICO Practitioner | Practitioner in 2+ areas | TOCICO Implementer |

Compact names only. The full anchors, with their conditions, are below.

---

## Cells in full

### Project Management (`pm`)

#### Associate — $45/hr

| Field | Value |
|---|---|
| Credential anchor | CAPM (23 contact hrs; no experience required) |
| Experience threshold | Coordinated project work |
| Demonstrated capability | Maintains schedules, logs, and artifacts under a lead |
| Verification | PMI CAPM page |

#### Practitioner — $65/hr

| Field | Value |
|---|---|
| Credential anchor | PMP-eligible or newly PMP (July 2026 ECO: 36 mo w/ bachelor's ÷ 60 mo w/ secondary, within 10 yrs; 35 contact hrs or CAPM waiver) |
| Experience threshold | ~3 years leading project work |
| Demonstrated capability | Runs full lifecycle of defined-scope projects; owns schedule, risk, stakeholder communications |
| Verification | PMI July 2026 ECO |

#### Senior — $90/hr

| Field | Value |
|---|---|
| Credential anchor | PMP (active; 60 PDU/3-yr renewal) |
| Experience threshold | 5+ years; complex multi-workstream deliveries |
| Demonstrated capability | Leads complex engagements; recovers troubled projects; mentors PMs; client-facing authority |
| Verification | PMI CCR program |

#### Lead — $120/hr

| Field | Value |
|---|---|
| Credential anchor | PgMP (48 mo program-mgmt experience in last 15 yrs [36 GAC] + 48 mo PM or active PMP; panel review) — or PMP + MI-judged program record |
| Experience threshold | Program/portfolio leadership |
| Demonstrated capability | Directs multi-project programs; benefits realization; governance design |
| Verification | PgMP Handbook + 3-source eligibility |

### Business Analysis (`ba`)

#### Associate — $45/hr

| Field | Value |
|---|---|
| Credential anchor | ECBA (no experience requirement) |
| Experience threshold | Exposure to requirements work |
| Demonstrated capability | Documents requirements; supports elicitation under guidance |
| Verification | IIBA Certification FAQ |

#### Practitioner — $65/hr

| Field | Value |
|---|---|
| Credential anchor | CCBA (3,750 hrs BA work in last 7 yrs; 900 hrs in 2 KAs or 500 in 4; 21 PD hrs in last 4 yrs) |
| Experience threshold | 2–3 years BA practice |
| Demonstrated capability | Independently elicits, models, and validates requirements across multiple BABOK knowledge areas |
| Verification | IIBA FAQ + application process PDF |

#### Senior — $90/hr

| Field | Value |
|---|---|
| Credential anchor | CBAP (7,500 hrs in last 10 yrs incl. 900 hrs in 4 of 6 KAs; 35 PD hrs; professional references) |
| Experience threshold | 5+ years across domains |
| Demonstrated capability | Leads BA on complex initiatives; enterprise analysis; mentors BAs |
| Verification | IIBA CBAP Handbook May 2026 |

#### Lead — $120/hr

| Field | Value |
|---|---|
| Credential anchor | CBAP (active; 60 CDU/3-yr) + strategic record |
| Experience threshold | BA practice leadership |
| Demonstrated capability | Shapes solution strategy; owns BA methodology and standards; advises executives |
| Verification | IIBA recertification table; Lead bar is MI judgment |

### Change Management (`ocm`)

#### Associate — $45/hr

| Field | Value |
|---|---|
| Credential anchor | Prosci Certified Change Practitioner (3-day, no experience prerequisite; 23 QEP hrs toward CCMP) or Standard-aligned equivalent |
| Experience threshold | Supported change initiatives |
| Demonstrated capability | Applies ADKAR and assessments; builds communications and training plans under a lead |
| Verification | Prosci QEP relationship |

#### Practitioner — $65/hr

| Field | Value |
|---|---|
| Credential anchor | CCMP-eligible (4-yr degree + 4,200 hrs OR secondary + 7,000 hrs; 21 hrs Standard-aligned instructor-led training within 7 yrs) |
| Experience threshold | ~3 years change work |
| Demonstrated capability | Owns change strategy for a project; resistance management; adoption measurement |
| Verification | ACMP CCMP FAQ (primary; conflicting secondary rejected) |

#### Senior — $90/hr

| Field | Value |
|---|---|
| Credential anchor | CCMP (active; 60 PDU/3-yr) |
| Experience threshold | 5+ years, multiple contexts |
| Demonstrated capability | Leads change on complex/transformational programs; coaches sponsors; integrates with PM and LSS |
| Verification | ACMP FAQ + Credly |

#### Lead — $120/hr

| Field | Value |
|---|---|
| Credential anchor | ACMP MCMP (≥6 yrs / 8,400 hrs; ≥6 hrs documented mentoring; additional training beyond CCMP) — or CCMP + MI-judged transformation record |
| Experience threshold | Enterprise transformation leadership |
| Demonstrated capability | Designs enterprise change capability; culture-level interventions; executive advisory |
| Verification | ACMP MCMP QRG Apr 2025 |

### Lean Six Sigma (`lss`)

#### Associate — $45/hr

| Field | Value |
|---|---|
| Credential anchor | MI Yellow Belt (or external YB/GB training) |
| Experience threshold | Exposure to improvement work |
| Demonstrated capability | Uses DMAIC tools with guidance; contributes data collection and process mapping |
| Verification | MI belt bridge: Yellow→Associate |

#### Practitioner — $65/hr

| Field | Value |
|---|---|
| Credential anchor | MI Green Belt, ASQ CSSGB (3 yrs full-time paid experience in GB BOK; no project affidavit), or IASSC ICGB |
| Experience threshold | ~3 years process work |
| Demonstrated capability | Leads scoped DMAIC projects; sound measurement and analysis; facilitates kaizen |
| Verification | ASQ CSSGB page; IASSC exam-only |

#### Senior — $90/hr

| Field | Value |
|---|---|
| Credential anchor | ASQ CSSBB: two completed projects with signed champion affidavits, OR one project + 3 yrs BB-BOK experience — or MI Black Belt equivalent |
| Experience threshold | Verified real projects with financial impact (mock/classroom projects rejected) |
| Demonstrated capability | Leads cross-functional projects; advanced statistics; coaches Green Belts |
| Verification | ASQ CSSBB page + insert + FAQ |

#### Lead — $120/hr

| Field | Value |
|---|---|
| Credential anchor | ASQ MBB: current CSSBB + portfolio review (≥5 yrs in SSBB/MBB role OR 10 completed BB projects w/ affidavits) — or MI-judged equivalent |
| Experience threshold | Multi-project program leadership |
| Demonstrated capability | Runs improvement portfolios; ties projects to strategy; develops belt talent |
| Verification | ASQ MBB page + portfolio form |

### Enterprise Architecture (`ea`)

#### Associate — $45/hr

| Field | Value |
|---|---|
| Credential anchor | TOGAF EA Foundation |
| Experience threshold | Exposure to architecture artifacts |
| Demonstrated capability | Speaks the ADM vocabulary; maintains architecture documentation |
| Verification | Open Group portfolio page |

#### Practitioner — $65/hr

| Field | Value |
|---|---|
| Credential anchor | TOGAF EA Practitioner (OGEA-102/103 or 9.x bridge) |
| Experience threshold | Contributed to ADM cycles |
| Demonstrated capability | Applies ADM phases to real scenarios; produces architecture deliverables |
| Verification | Open Group portfolio page |

#### Senior — $90/hr

| Field | Value |
|---|---|
| Credential anchor | TOGAF Practitioner + Applied Practitioner badge (Learning Studies with Accredited Training Provider) |
| Experience threshold | Led architecture workstreams |
| Demonstrated capability | Runs ADM cycles; governance boards; cross-domain synthesis |
| Verification | Open Group portfolio page |

#### Lead — $120/hr

| Field | Value |
|---|---|
| Credential anchor | TOGAF EA Leader credential + demonstrated enterprise-level leadership (credential is knowledge-based, not experience-assessed — MI judgment carries the Lead bar) |
| Experience threshold | Enterprise EA capability leadership |
| Demonstrated capability | Establishes EA practices; AI-era architecture governance; "EA of AI" standard-bearer |
| Verification | Open Group EA Leader datasheet |

### Theory of Constraints (`toc`)

#### Associate — $45/hr

| Field | Value |
|---|---|
| Credential anchor | TOC Fundamentals Certified (TOCFC) |
| Experience threshold | Exposure to TOC concepts |
| Demonstrated capability | Five Focusing Steps fluency; throughput vs. cost-world thinking |
| Verification | TOCICO fundamentals page |

#### Practitioner — $65/hr

| Field | Value |
|---|---|
| Credential anchor | TOCICO Practitioner exam in an application area (CCPM, SCL, TP, F&M); Fundamentals prerequisite; 8-hr written exam |
| Experience threshold | Worked within a live TOC application |
| Demonstrated capability | Plans, executes, and continuously improves an implemented TOC application |
| Verification | TOCICO CCPM practitioner page |

#### Senior — $90/hr

| Field | Value |
|---|---|
| Credential anchor | Practitioner in 2+ application areas, or Implementer trajectory |
| Experience threshold | Led TOC application design |
| Demonstrated capability | Designs rules, buffers, and metrics for new implementations; teaches TOC |
| Verification | MI judgment tier between TOCICO L2 and L3 |

#### Lead — $120/hr

| Field | Value |
|---|---|
| Credential anchor | TOCICO Implementer (case study of an actual implementation led by candidate) |
| Experience threshold | End-to-end implementation leadership |
| Demonstrated capability | Leads full TOC transformations; synthesis across applications; thinking-process mastery |
| Verification | TOCICO Implementer assessment |

---

## Re-verification

External bodies change their eligibility rules. PMI moved the PMP to a new ECO
in July 2026; ACMP revised the MCMP quick reference in April 2025; IIBA
reissued the CBAP handbook in May 2026. Each of those would have silently
invalidated a cell here.

Every quarter, walk each cell with a verification note back to its named
source and confirm the requirement still reads as recorded. Where it has
changed, update `cns_level_criteria` through Architecture and regenerate this
document. Where a cell has no verification note, confirm the MI judgment still
holds.

Last verified: **August 2026**. Next due: **November 2026**.
