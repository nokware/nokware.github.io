---
title: "Automating Time Logging with Git and Calendar Data"
date: 2025-12-18T12:42:56-07:00
draft: false
image: images/blog/nokware-time-logging-automation.png
feature_image: images/blog/nokware-time-logging-automation.png
author: Mishael Ochu
lastmod: 2026-11-23
---

Preparing time entries meant reviewing Outlook calendars, Git commits and Bitbucket pull-request activity, then assigning each item to a Tempo issue. That took 30 to 60 minutes a week and left room to miss work recorded in another system.

I built a pipeline that gathers those records and prepares a logging script for review.

### Assemble the entries

The pipeline has six steps that can run together or independently.

1. Extract meetings from Outlook calendar PDFs.
2. Categorize standups, availability slots and other meetings.
3. Query commits across more than 25 repositories.
4. Collect Bitbucket review activity.
5. Generate a script for the Tempo API.
6. Check totals against the daily 14-hour limit.

Meeting categories map to Jira issues. These issue keys are examples.

```bash
STANDUP_ISSUE="PROJ-100"
AVAILABILITY_ISSUE="PROJ-101"
OTHER_MEETING_ISSUE="PROJ-102"
```

The Git step extracts issue IDs from commit messages within the selected date range. Its repository list covers the client's legacy repositories and newer services.

```bash
REPOS=(
    "/path/to/shipping-api"
    "/path/to/integrations"
    "/path/to/analysis"
    "/path/to/legacy-system/admin-back-office"
    "/path/to/legacy-system/franchise"
)
```

### Inspect the generated script

The generated API calls are commented out by default. I can inspect the proposed entries and totals before enabling them.

```bash
# DRY RUN — Uncomment after reviewing the proposed entries
# curl -X POST "$TEMPO_API_URL/worklogs" ...
```

The recorded two-week run processed more than 100 meetings and 40 development issues while retaining the daily-limit checks. Preparation took under five minutes. Reviewing the generated entries remained part of the workflow before submission.
