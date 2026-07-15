-- public.leads stores sales-lead PII (name, whatsapp, email). The existing
-- policies let ANY authenticated app user (e.g. any tenant/locador) SELECT
-- every lead via the public anon/authenticated key, and let anyone INSERT
-- directly. Inserts are already done server-side via the service-role key
-- (src/app/actions/lead.ts), so no client-side policy is needed at all.
DROP POLICY IF EXISTS "Allow authenticated read" ON public.leads;
DROP POLICY IF EXISTS "Allow public inserts" ON public.leads;
