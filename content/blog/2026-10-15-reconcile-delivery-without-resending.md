---
title: "Repairing Email Status Without Sending the Email Again"
date: 2026-10-15
lastmod: 2026-11-03
draft: false
author: Mishael Ochu
description: "Repairing signup forms and reconciling historical task results without replaying delivery."
tags: [email, observability, reliability]
---

A campaign dashboard can be wrong even when the underlying work has already happened. That was the problem behind an email repair: recipients still appeared scheduled after their delivery tasks had finished.

The tempting shortcut would have been to retry the apparently unfinished work. That would confuse missing application evidence with missing execution and risk sending duplicates.

### Read the evidence before changing the state

The reconciliation path resolved the original schedule references to their execution sessions, read the recorded task status, and updated the application's recipient and event records together. It retained the original completion timestamps.

Later events also mattered. A historical send completion should not overwrite a bounce or failure recorded afterward. Conditional updates preserved those later states.

The reconciliation operation did not register, schedule, retry, or send mail. Its job was to repair the application's account of an earlier event.

Running the reconciliation again checked zero remaining scheduled recipients and made no changes. That repeat run was useful evidence that the repair had reached a stable result.

### The signup path needed its own repair

At the same time, the public signup forms needed working CAPTCHA integration and understandable feedback. The repair addressed public-key configuration, content security policy, token expiration and reset, and confirmation or retry messages.

An isolated browser test followed signup through email-link confirmation. Production probes checked the real CAPTCHA path without creating subscribers or sending test invitations to real people.

That distinction matters: a test reaching a confirmation-requested response demonstrates part of the plumbing. It does not demonstrate audience demand.

### Monitor the failure people actually experience

CAPTCHA failures now had a private dashboard, metrics, and operational alerts. Alert claims were stored atomically so concurrent requests or a process restart would not produce duplicate notifications within the same time bucket.

The release passed 76 tests, type checks, builds, and the focused browser checks recorded for that deployment. Those are dated verification results, rather than a claim that the service will never fail again.

The useful pattern extends beyond email. Separate execution from observation, preserve later evidence, and make a repair operation incapable of accidentally replaying the original side effect.
