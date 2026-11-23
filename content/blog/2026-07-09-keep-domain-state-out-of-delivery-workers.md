---
title: "Keep Domain State Out of Delivery Workers"
date: 2026-07-09
lastmod: 2026-11-03
draft: false
author: Mishael Ochu
description: "The architecture boundary between mailing-list state, task routing, and email delivery."
tags: [architecture, email, automation]
---

An email application has two different kinds of responsibility: deciding what should happen and arranging for it to happen. I wanted those responsibilities to stay visible as mail-mgmt grew.

The boundary I documented puts contacts, consent, memberships, campaigns, suppression records, and audit history in mail-mgmt. Hydra handles outbound task routing, operational notifications, scheduled checks, and worker selection. The mail worker owns the local delivery configuration and process supervision.

That gives each part a question it can answer. Is this person subscribed? Ask mail-mgmt. Which worker should perform this task? Ask Hydra. What happened during the delivery attempt? Follow the worker's execution record, then reconcile that evidence with the application state.

### A narrow interface leaves room to change

It would be easy to put a separate notification SDK into every application. Each service would then accumulate its own credentials, retry behavior, and assumptions about vendors. The code might begin small, but the operational behavior would spread across the system.

The alternative here is to expose useful health information, metrics, structured logs, and explicit tasks. The application retains the facts that belong to its domain. The execution system handles the external work.

This is a preference with a reason behind it, rather than a ban on SDKs. If vendor-specific behavior really belongs inside an application's request path, that is a separate design decision. It should be made deliberately.

### Submission and completion are different facts

A queued task does not prove an email was delivered. A worker result does not, by itself, establish permission to send another message. Consent and suppression remain application responsibilities even when execution happens elsewhere.

The interface needs enough identity to connect a campaign recipient with the corresponding task and result. Otherwise the separation creates two competing stories about what happened.

Writing this boundary down was useful because future integrations now have a place to start. Before adding a dependency, I can ask whether I am extending the domain model or adding another side effect. That question keeps a small application from quietly becoming several overlapping systems.
