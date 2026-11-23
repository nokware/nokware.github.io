---
title: "Repairing Email Status Without Sending the Email Again"
date: 2026-10-15
lastmod: 2026-11-23
draft: false
author: Mishael Ochu
description: "Repairing signup forms and reconciling historical task results without replaying delivery."
tags: [email, observability, reliability]
---

An email dashboard still showed recipients as scheduled after their delivery tasks had finished. Retrying those tasks could have sent duplicate messages. I needed to recover the missing application records from the recorded execution results.

### Reconcile the completed work

The repair resolved each original schedule reference to its execution session. It read the task result and updated the application's recipient and event records together, retaining the original completion timestamp.

Conditional updates protected later evidence. A historical send completion could otherwise overwrite a bounce or failure that occurred afterward.

The reconciliation operation had no path to register, schedule or send mail. A repeat run found zero remaining scheduled recipients and made no changes.

### Repair the signup path

The public signup forms also needed CAPTCHA integration and clearer feedback. That work covered the public-key configuration, content security policy, token expiration and reset, and confirmation or retry messages.

An isolated browser test followed signup through email-link confirmation. Production probes checked the CAPTCHA path without creating subscribers or sending invitations to real people. Those checks established which parts of the form flow worked.

CAPTCHA failures became visible through a private dashboard, metrics and operational alerts. Alert claims were stored atomically to prevent concurrent requests or a restart from duplicating notifications within the same time bucket.

The release passed 76 tests, type checks, builds and its focused browser checks. The reconciliation result and form verification were recorded separately, so I could distinguish a repaired delivery record from a newly tested signup request.
