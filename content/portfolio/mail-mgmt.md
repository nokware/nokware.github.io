---
title: Mail-Mgmt Public Email Operations
date: 2026-07-08
type: portfolio
image: "images/blog/nokware-mail-mgmt-contact-form.png"
category: ["EMAIL OPERATIONS", "STATIC SITE BACKEND"]
project_images: ["images/blog/nokware-mail-mgmt-contact-form.png"]
---

Mail-Mgmt is a small internal service that gives static sites a practical email
backend without handing the first customer touchpoint to a third-party form
provider.

For Nokware, it now accepts project inquiries from the Hugo site, handles
double opt-in subscriptions, supports unsubscribe flows, records consent and
audit events, and can route outbound messages through worker infrastructure.

The work keeps the website static and easy to publish while moving operational
concerns into a service built for validation, rate limiting, provenance,
notifications, and future campaign workflows.

Key pieces:

- Public contact form endpoint for `nokware.net`
- Double opt-in subscription workflow
- Suppression and unsubscribe handling
- Mock outbox for local development
- Hydra Router handoff for production email tasks
- Durable integration notes for future static-site work
