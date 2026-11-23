---
title: "Building a Systematic Approach to Freelance Proposals"
date: 2025-12-12T11:37:32-07:00
draft: false
image: images/blog/nokware-upwork-proposal-funnel.png
feature_image: images/blog/nokware-upwork-proposal-funnel.png
author: Mishael Ochu
lastmod: 2026-11-23
---

I built a workspace for preparing freelance proposals so I could find earlier research and reuse an approach that had worked. Each opportunity gets its own notes and draft, with successful proposals retained for later review.

The workflow starts with choosing opportunities that match my experience. I develop the proposal for that job, review the result and record what I learn before trying to automate more of the process.

### Prepare the text and attachment

The workflow used two outputs for an Upwork proposal. A short cover letter fit the 5,000-character field, and a separate PDF held the detailed approach. The short version had a character-count check and an HTML copy for transfer into the form. The PDF used a letterhead template.

```bash
# Produce the short text version and validate its length
./generate-html.sh proposals/client-proposal.md

# Produce the detailed attachment
./generate-pdf.sh proposals/client-attached.md
```

The PDF path converted Markdown through an ODT template and used tools such as Pandoc. The draft and generated attachment could then be reviewed together before submission.

### Keep the research with the proposal

```text
jobs/
  client-name/
    job-guide.md
proposals/
  client-name/
    short-proposal.md
    attached.md
wins/
  client-name/
    learnings.md
templates/
  letter-head.odt
```

Keeping these files together makes it easier to recover the reasoning behind a proposal. The preparation checks also cover platform restrictions, including contact information before a contract is awarded.

The workspace provides examples for later Hydra Agents automation. Opportunity selection and proposal review still need to show which approaches are worth repeating.
