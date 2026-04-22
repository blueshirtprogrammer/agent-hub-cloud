# FOUNDRYOS™ Licence Heartbeat

## Purpose

Turn FOUNDRYOS from a downloadable launcher into a licensable company operating system.

The licence heartbeat checks whether a user or installation is entitled to premium templates, skills, agent heartbeats, revenue autopilot, and hosted runtime access.

## Principle

Do not sabotage customer systems.

Do:

- gracefully disable premium features,
- pause hosted/runtime services,
- keep customer data export available,
- honour grace periods,
- keep audit logs.

Do not:

- delete customer data,
- damage local files,
- break existing exported artifacts,
- hide kill switches,
- disable access without clear billing status.

## Stripe model

Use Stripe Subscriptions and Stripe Entitlements.

Stripe Entitlements map internal product features to Stripe products, then notify the app when feature access should be granted or revoked.

## Feature keys

```text
premium_templates
agent_heartbeats
revenue_autopilot
proposal_invoice_workflows
premium_skills
hosted_runtime
company_lease
enterprise_private_foundry
support_channel
```

## Licence states

```text
trial
active
past_due
grace
suspended
cancelled
enterprise_override
```

## Heartbeat frequency

```text
Hosted runtime: every 5-15 minutes
Local launcher: every 6-24 hours
Enterprise: configurable
```

## Grace period

```text
Failed card: 3 days
Enterprise invoice: 7 days
Chargeback/fraud/manual revoke: immediate review
```

## API design

### Activate installation

```text
POST /api/license/activate
```

Payload:

```json
{
  "license_key": "provided_by_customer",
  "installation_fingerprint": "local_or_hosted_install_id",
  "company_template": "enterprise-hospitality-ai"
}
```

### Heartbeat

```text
POST /api/license/heartbeat
```

Payload:

```json
{
  "installation_id": "inst_123",
  "license_key_hash": "hash",
  "version": "0.1.0",
  "features_requested": [
    "agent_heartbeats",
    "premium_skills",
    "revenue_autopilot"
  ]
}
```

Response:

```json
{
  "status": "active",
  "plan": "company_lease",
  "entitlements": [
    "premium_templates",
    "agent_heartbeats",
    "revenue_autopilot",
    "proposal_invoice_workflows"
  ],
  "grace_until": null,
  "message": "Licence active"
}
```

## Feature enforcement

### Free/demo

Allowed:

- launcher UI,
- public docs,
- basic install plan,
- demo templates.

### Founder install

Allowed:

- one template,
- basic skills,
- connector cockpit,
- local install guide.

### Company lease

Allowed:

- premium templates,
- agent heartbeat runtime,
- revenue autopilot,
- proposal/invoice workflows,
- skill updates,
- hosted dashboard.

### Enterprise private foundry

Allowed:

- private templates,
- SSO,
- audit logs,
- custom agents,
- custom connectors,
- private deployment,
- support SLA.

## Past-due behaviour

```text
Day 0: payment fails
Day 1-3: warning banner and billing portal link
Day 4: premium agent heartbeats pause
Day 7: template updates disabled
Day 14: hosted runtime suspended
Always: data export remains available
```

## Required tables

```text
customers
licences
subscriptions
entitlements
installations
heartbeats
feature_flags
audit_events
```

## Agent integration

The Licence Entitlements Agent checks:

- current subscription status,
- active entitlements,
- installation status,
- overdue state,
- grace period,
- features requested.

It reports to:

- CFO Agent,
- Launch Director Agent,
- Board Agent.

## Board approval required

Approval required for:

- changing grace periods,
- suspending enterprise customer access,
- disabling hosted runtime,
- changing feature entitlements,
- changing pricing or plan mappings.
