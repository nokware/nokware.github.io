---
title: "Replacing Third-Party Contact Forms with Mail-Mgmt"
date: 2026-07-08T08:00:00-06:00
image: images/blog/nokware-mail-mgmt-contact-form.png
feature_image: images/blog/nokware-mail-mgmt-contact-form.png
author: Mishael Ochu
lastmod: 2026-11-23
---

I moved Nokware's contact form to `mail-mgmt.nokware.net` so I could manage inquiries alongside the subscription and delivery records I already maintained there. Hugo continues to publish the website through static hosting.

### Follow an inquiry from the browser

1. The contact page renders an HTML form.
2. The browser posts to `https://mail-mgmt.nokware.net/api/public/contact`.
3. The service validates the fields, rate-limits submissions and checks the honeypot.
4. It creates a structured email notification and records an audit event.
5. The browser returns to the contact page after receipt.

The request contains the fields needed to route the inquiry.

```text
POST /api/public/contact
  name
  email
  project_type
  about_project
  source
  source_url
```

Hugo owns the page and form presentation. `mail-mgmt` accepts the request and handles notification delivery. The endpoint has no dependency on the Hugo theme, and the page has no mail-provider credentials.

### Reuse the existing service

The mail service already handles double opt-in and unsubscribe requests. Contact inquiries use some of the same form-validation and notification machinery, while retaining their own request flow.

Project-type tagging and follow-up tasks are possible extensions. They would belong behind this endpoint, where I can change the routing without redeploying the site's presentation code.
