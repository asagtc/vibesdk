# OnCall integration

This fork is the isolated code-generation and preview service used by OnCall App
Studio. End users interact with Captain Chat; they do not need the VibeSDK UI.

The OnCall API connects through `@cf-vibesdk/sdk`, stores the Vibe agent id against
the canonical OnCall project/build, and converts Vibe session state into Studio
progress, file, and preview events.

The scratch template includes `worker/oncall.ts`. It calls only the fixed virtual
origin `https://capabilities.oncall.internal`, which the OnCall Workers for
Platforms outbound Worker intercepts. The generated app never receives tenant,
actor, installation, capability, or service credentials. Mutations require stable
idempotency keys.

Rules for generated applications:

- Import `invokeOnCall` only in Worker/server code.
- Browser components call routes on their own Worker.
- OnCall remains authoritative for customers, products, inventory, carts, orders,
  payments, members, chat, files, notifications, and live objects.
- Never create parallel customer, product, order, or payment truth in the app.
- Never add an OnCall API token to source, environment variables, local storage,
  or browser requests.
- Deploy production releases through the OnCall generated-app provisioner. The
  Vibe dispatch namespace is suitable for Vibe-owned previews, not canonical
  OnCall installations.

Use `builder.oncallpages.com` for the service itself. Do not claim
`*.oncallpages.com`; that wildcard belongs to the OnCall generated-app dispatcher.

