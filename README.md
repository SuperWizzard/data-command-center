# Portfolio 2.0 — The Story Behind the Work

Existing Lovable project: https://lovable.dev/projects/dc2865b2-ed90-4781-bf67-44a986ede8fb

Connected GitHub repository: SuperWizzard/data-command-center, branch main. The pre-redesign checkpoint is the local tag portfolio-v1-checkpoint-20261126 at 0025a6b1cb262a9e63c0f3482299604bf5e2c305.

## Run and verify

Use Node.js with npm. Run `npm ci`, then `npm run dev`. Vite defaults to http://localhost:8080. Use `npm run build` and `npm run preview` to review the production output. Public Supabase URL and publishable key are required in the existing Vite environment; never place a service-role key in a VITE variable.

Checks: `npx tsc --noEmit -p tsconfig.app.json`, `npm test`, `npm run build`, `npm run lint`. The original repository has unrelated lint errors in legacy analytical pages, UI types and tailwind.config.ts; these are not hidden or suppressed by this redesign. New and modified application files are linted separately.

## Content and architecture

`src/data/portfolio.ts` contains public profile facts, the six story chapters, six project case studies, capabilities, current work, certifications and AI starter questions. `StorySections.tsx` composes reusable editorial sections; `ProjectPage.tsx` supplies the consistent eight-part case study narrative and labelled conceptual diagrams. Navigation supports mobile menus and keyboard access. Route pages are lazy-loaded, the portrait is optimised, the gallery is manually controlled, and animations respect reduced-motion preferences.

The existing /bikeshare, /scheduling, /workforce, /erp-analysis and /admin pages remain available. Original data modules, resume, certificates, dashboard assets and portrait source are retained. The old unverified performance counters are no longer rendered. No fake activity stream or historical analytics was added. Netlify-compatible SPA fallback rules are in public/_redirects; Lovable hosting already supplies SPA routing.

Chat uses the same deployed endpoint and provider. It now has bounded input/history, safe Markdown/link rendering, timeout/cancellation, accessible controls, loading/errors, concurrent-save protection and a privacy notice. The server biography is still the old version pending a separately approved backend deployment. Suggested questions are prefilled for visitor review before sending. Frontend cooldowns are not server abuse protection.

Analytics track each meaningful route once per browser session, exclude admin/local development, respect Do Not Track and send only the referrer origin. The private dashboard adds all-time visit/conversation/message counts, sampled page engagement and daily trends, labelled as the latest 500 visits. It preserves current sign-in behavior. Administrator-only RLS remains a separate required security rollout; do not treat the current session check as sufficient authorisation.

## Security and deployment boundaries

See docs/SECURITY-REVIEW.md for the verified policy risks and a staged administrator-only access, ownership and abuse-prevention proposal. See docs/ASSISTANT-UPDATE.md for the public knowledge and behaviour update. These are proposals: no production migration, authentication update, record deletion or Edge Function deployment is authorised by a frontend release.

After verification, fetch origin and reconcile concurrent changes before committing and pushing main. Do not force push. Verify Lovable imports the exact commit before publishing. Use its existing Publish/Update flow and check the custom domain separately; a successful push or preview build does not prove the public domain is updated. Preserve the domain and existing backend. If the domain points to another host, verify its deployment status rather than changing DNS without review.

## Content requiring later confirmation

- Existing resume wording and whether it should be updated; the download is unchanged.
- Previously displayed 5+ years, 5+ forecast models, 15+ reporting systems, 50+ datasets and 10+ scheduling models: omitted pending evidence.
- Exact employment dates, promotion dates, quantified outcomes and project completion dates: not invented.
- Knowledge Hub feature-by-feature completion and screenshots: described as ongoing; conceptual diagrams are explicitly labelled.
- Owner UUID/admin membership, privacy retention and deletion handling: must be settled before the backend security rollout.
- Conversation topics, unique visitor measurement and finer engagement events require additional design; only existing stored counts/routes are used now.

The existing assistant biography can lag behind the new content until its separately approved deployment. No end-to-end production AI request is needed to publish the compatible frontend, and no Lovable AI generation credits were used for implementation.
