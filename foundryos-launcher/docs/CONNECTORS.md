# FOUNDRYOS Connector Cockpit

The launcher should guide users to create and connect credentials through official dashboards and OAuth flows.

## Provider pages

| Provider | Purpose | URL |
|---|---|---|
| OpenRouter | Model routing | https://openrouter.ai/settings/keys |
| OpenAI / Codex | API and Codex access | https://platform.openai.com/api-keys |
| GitHub | Repository access | https://github.com/settings/tokens |
| Stripe | Billing and subscriptions | https://dashboard.stripe.com/apikeys |
| Resend | Email sending and inbound webhooks | https://resend.com/api-keys |
| Fly.io | Cloud deployment | https://fly.io/user/personal_access_tokens |

## Allowed credential methods

- OAuth
- user-created API keys
- official CLI login
- scoped tokens
- secrets managers
- local environment variables for dev only

## Not allowed

- scraping browser sessions
- extracting local cookies
- bypassing platform checks
- creating fake accounts
- farming free tiers
- hiding automation to deceive services

## Validation pattern

Every connector should return a status object:

```json
{
  "provider": "openrouter",
  "status": "connected",
  "scopes": ["models:read", "chat:create"],
  "lastCheckedAt": "ISO_DATE",
  "safeTest": "listed models"
}
```
