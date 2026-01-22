---
title: "Automating Time Logging with Git and Calendar Data"
date: 2025-12-18T12:42:56-07:00
draft: true
image: images/blog/blog-post-02.jpg
feature_image: images/blog/blog-details-image.jpg
author: Mishael Ochu
---
### From Hours of Manual Entry to Minutes of Automation

Time tracking is essential for billing and project management, but manually logging hours is tedious and error-prone. I built an automation system that generates Tempo time entries by mining data from multiple sources: Outlook calendars, git commits, and Bitbucket PR reviews.

#### The Problem

As a contractor working across multiple repositories and attending various meetings, tracking time accurately meant:
- Reviewing calendar entries daily
- Cross-referencing git history for development work
- Checking Bitbucket for PR review activity
- Manually entering each item into Tempo with the correct Jira issue

This process took 30-60 minutes per week and was prone to missing items.

#### The Solution: A Six-Step Pipeline

The system breaks down into modular steps that can run independently or together:

1. **Parse Calendar PDF** - Extract meetings from Outlook calendar exports
2. **Categorize Meetings** - Auto-classify standups, availability slots, and other meetings
3. **Mine Git Commits** - Query commits across 25+ repositories
4. **Track PR Reviews** - Query Bitbucket API for review activity
5. **Generate Logging Script** - Create executable bash scripts for Tempo API
6. **Verify Totals** - Ensure no day exceeds the 14-hour limit

#### Automatic Meeting Categorization

```bash
# Meetings are mapped to predefined Jira issues
STANDUP_ISSUE="PROJ-100"      # Daily standups
AVAILABILITY_ISSUE="PROJ-101"  # Short meetings, availability
OTHER_MEETING_ISSUE="PROJ-102" # General meetings
```

The system recognizes patterns in meeting titles to categorize them automatically, saving manual classification time.

#### Multi-Repository Support

Working with my client's 21+ legacy repositories plus several newer ones requires efficient commit tracking:

```bash
REPOS=(
    "/path/to/shipping-api"
    "/path/to/integrations"
    "/path/to/analysis"
    "/path/to/legacy-system/admin-back-office"
    "/path/to/legacy-system/franchise"
    # ... 20+ more
)
```

The system queries each repository for commits within the date range, extracting Jira issue IDs from commit messages.

#### Safe Execution with Dry-Run Mode

Generated scripts include dry-run mode by default - API calls are commented out for review before execution:

```bash
# DRY RUN - Uncomment to execute
# curl -X POST "$TEMPO_API_URL/worklogs" ...
```

This prevents accidental duplicate entries and allows verification before submission.

#### Results

What once took 30-60 minutes of manual work now completes in under 5 minutes. The system has successfully processed 100+ meetings and 40+ development issues in a two-week period, maintaining compliance with daily hour limits throughout.

> Automation should make the tedious invisible while keeping the human in control of the final output.
