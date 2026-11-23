---
title: "Routing Email Operations Through Agent-Ready Infrastructure"
date: 2026-07-08T08:15:00-06:00
image: images/blog/nokware-agent-router-email-ops.png
feature_image: images/blog/nokware-agent-router-email-ops.png
author: Mishael Ochu
lastmod: 2026-11-23
---

Email delivery crosses several parts of my system. A subscription request needs a confirmation token. A campaign needs a recipient record and approval before sending. Putting those decisions inside a delivery worker would make consent depend on the transport.

I keep contacts, list memberships, suppression records and campaign state in `mail-mgmt`. It also handles public forms, double opt-in, unsubscribe requests, recipient previews and campaign activity records.

### Hand a specific task to the router

When a message is ready for delivery, the application creates a structured request containing the sender, recipient, subject and body. In local development, that request becomes a JSON file in `outbox/`. In production, it can be registered with the agent router.

```text
taskKind: mail-send
source: mail-mgmt
labels: mail-mgmt, email, proton-bridge
```

The worker performs that task through an approved transport, such as Proton Bridge or a local SMTP relay. Changing the transport leaves the public application's consent and campaign records in place.

### Keep approval in the application

Campaigns can be drafted, previewed and approved before they are queued. Transactional messages and contact notifications have their own routing rules. Each request carries enough context to identify the intended action and connect its result to the application record.

The local outbox lets me inspect the message produced by the application without sending it. I can check its destination and content before testing delivery through a worker. After delivery, the application still needs to reconcile the worker's result with the recipient record.
