-- Every table should include org_id UUID NOT NULL and be protected by org-based RLS.
alter table if exists customers enable row level security;
alter table if exists invoices enable row level security;

create policy if not exists "org isolation on customers"
on customers for all
using (org_id = auth.jwt()->>'org_id')
with check (org_id = auth.jwt()->>'org_id');

create policy if not exists "org isolation on invoices"
on invoices for all
using (org_id = auth.jwt()->>'org_id')
with check (org_id = auth.jwt()->>'org_id');
