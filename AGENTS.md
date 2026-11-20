<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- The site is a single scrolling page (`src/routes/index.tsx`) composed of section components in `src/components/site/`; nav links target section ids. Why: the brief asks for smooth-scroll navigation with active-section highlighting.
- Site copy lists (nav, services, steps, metrics, FAQs) live in `src/lib/site-content.ts`. Why: one place to edit content without touching layout.
- Consultation requests are validated by the shared zod schema in `src/lib/consultation-schema.ts` and inserted server-side via `submitConsultation` into `consultation_requests` (RLS on, no public policies); only after the insert succeeds, `make-webhook.server.ts` forwards the saved row to the Make.com URL in the `MAKE_WEBHOOK_URL` secret and never throws. Why: visitors can never read or write submissions directly, and a webhook outage must never lose a booking.
- The savings calculator math lives in `src/lib/roi.ts` with tests beside it. Why: keeps the formula testable apart from the UI.
- The theme is dark-only; brand colors are tokens in `src/styles.css`. Why: the brand identity is a dark design.
