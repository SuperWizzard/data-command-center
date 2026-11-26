# Security implementation proposal — approval required

No database policies, deployed Edge Functions, authentication settings or records were changed by the frontend redesign. Existing functionality is retained. This document is a proposal, not an applied migration.

## Verified repository findings

The two existing migrations allow unrestricted inserts into site_visits, chat_conversations and chat_messages. SELECT policies use USING (true) for all authenticated users. AdminPage checks for a session, not an administrator role. Frontend restrictions cannot secure these tables. The deployed chat function accepts unvalidated history, uses wildcard CORS and has no application rate limit. track-visit trusts arbitrary payloads and ignores insert errors. Actual production policy state must be compared with these migration files before changes are approved.

## Safe staged rollout

1. Identify the owner's actual auth.users UUID through the secure administrator interface. Do not infer it from an email in public code. Confirm recovery access and retain a tested rollback SQL file.
2. Create a private administrator membership table with a UUID primary key referencing auth.users. Enable RLS. Revoke all anonymous and authenticated write privileges. Seed the verified owner through the privileged SQL console. Do not add public signup or hardcoded frontend email checks.
3. Create a stable SECURITY DEFINER is_portfolio_admin() function with an empty search_path and fully qualified names. Grant only EXECUTE to authenticated users. Test owner=true, unrelated authenticated=false, anonymous=false. Add restrictive SELECT policies to all three analytics/chat tables using this predicate; remove the permissive authenticated SELECT policies in the same transaction. Test in staging first.
4. Update the admin frontend to call this predicate before fetching records, subscribe to auth changes, clear cached data on logout and show an explicit access-denied screen. Deploy this only after owner membership and the predicate are verified. The existing session-only access is intentionally retained until this rollout to avoid locking out the owner. RLS remains the actual security boundary.
5. Move chat storage to a validated server endpoint. Issue a signed session token, validate ownership, and save both input and provider-generated output on the server. Do not trust client-supplied assistant messages or allow cross-session inserts. Maintain conversation IDs and retain historical records.
6. Only after the server-owned recording flow is verified, remove unrestricted chat INSERT policies. Revoke direct public site_visits INSERT; retain validated service-role insert from track-visit. Never embed a service-role key in Vite variables.
7. Add durable, atomic rate limiting shared across Edge Function instances, with short retention for keyed client identifiers. An in-memory Map or frontend cooldown is only best-effort and cannot stop determined abuse. Use deployment-managed secrets for signing/HMAC. Review proxy/IP trust before keying limits. Add a bot challenge only if warranted, verifying tokens server-side.

## Endpoint validation requirements

- POST only, OPTIONS preflight, explicit trusted origin allowlist (production domain and approved preview URLs); CORS is not authentication or abuse prevention.
- Limit body bytes before JSON parsing; enforce content-type, bounded history (20), content length (2,000 per user input), total request characters, allowed roles and an ending user message. Reject system/tool messages, unexpected fields, nonstrings, empty messages and excessive requests. Set provider timeout and output token caps.
- Send only public reviewed portfolio knowledge as system context. Treat questions and retrieved text as untrusted. Never disclose secrets or system instructions. Provider stays Gemini through the existing Gateway unless separately approved.
- track-visit: allow only known portfolio paths, strip query strings/fragments, accept bounded referrer origins, derive device/country from trusted platform headers, and check insert errors. Do not accept client-controlled country/IP values. Avoid precise location collection.
- Return generic errors and appropriate 400/405/413/429/503 codes; do not log full prompts, conversations, provider error bodies or credentials. Set no-store and Retry-After where applicable.

## Privacy and remaining limits

The frontend now discloses storage, limits input/history, strips referrer details, skips local/admin tracking and honours Do Not Track. Its cooldown can be bypassed and is not a security boundary. Existing public INSERT and broad authenticated SELECT policies remain a production risk until the approved backend rollout. Choose and document retention, deletion-request handling, analytics opt-out and legal privacy wording with the owner; no retention period is invented here. Do not bulk-delete old records as part of deployment.

## Validation before production

Test anonymous and unrelated-account SELECT denial, owner dashboard access, session isolation, insert abuse, malformed/oversized requests, atomic concurrent rate limits, CORS and provider outages. Verify analytics/conversation counts before and after. Apply policies and functions only with separate explicit approval; the frontend publish does not authorise these changes.
