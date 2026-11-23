---
title: "Keep Domain State Out of Delivery Workers"
date: 2026-07-09
lastmod: 2026-11-23
draft: false
author: Mishael Ochu
description: "The architecture boundary between mailing-list state, task routing, and email delivery."
tags: [architecture, email, automation]
---

As mail-mgmt grew, I documented which service owned each part of an email operation. Contacts, consent, list memberships, campaigns, suppression records and audit history belong in mail-mgmt. Hydra handles task routing, operational notifications, scheduled checks and worker selection. The mail worker owns its local delivery configuration and process supervision.

That division gives me a place to investigate a failure. Subscription status comes from mail-mgmt. Worker selection comes from Hydra. A delivery attempt has a worker execution record that must be reconciled with the application's state.

### Add integrations at the right boundary

Putting a notification SDK into every application would spread credentials and retry behavior across services. In this design, applications expose health information, metrics, structured logs and explicit tasks. The execution system performs the external work.

Some vendor-specific behavior may still belong in an application's request path. Writing down the existing boundary makes that a decision I can review before adding the dependency.

### Connect the task result to the recipient

A queued task records an intention to deliver. The worker's result records what happened during execution. Consent and suppression decisions still come from the application.

The interface needs enough identity to connect a campaign recipient to the task and its result. Without that link, a worker can finish while the application continues to show an unfinished delivery.
