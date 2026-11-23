---
title: "Hydra Agents: Building an AI-Powered PR Review System"
date: 2025-10-04T21:35:38-06:00
image: images/blog/nokware-hydra-pr-review.png
feature_image: images/blog/nokware-hydra-pr-review.png
author: Mishael Ochu
lastmod: 2026-11-23
---

I built Hydra Agents to review pull requests across client repositories. A review starts from a Bitbucket event and uses the code changes together with the Jira requirements.

### Run a review when the pull request changes

Bitbucket webhooks trigger a Jenkins pipeline when a pull request is created or updated. The pipeline gathers the changes and requirements for Claude to review. Depending on the workflow, a Discord approval step lets a team lead review the result before it is posted to Bitbucket.

The review covers security concerns, code quality, test coverage and performance implications. The pipeline also detects supported build tooling, including npm, Maven, Gradle, pip and Composer, and runs the corresponding checks.

### Cache repositories between runs

Cloning every repository for each review was expensive for clients with more than 20 repositories. A persistent Jenkins cache keeps the checkout structure available for later runs.

```text
/var/jenkins/client-repos/
  client-name/
    pr-review/
      shipping-api/
      integrations/
      legacy-system/
        admin-back-office/
        franchise/
```

The recorded review times were two to five minutes on an initial run and 30 to 60 seconds on subsequent runs using the cache. Those timings describe that setup, including the available repository cache.

### Review the generated review

The Discord approval message presents a summary so a team lead can approve or reject publication. That gives the reviewer a chance to catch a mistaken interpretation of a requirement before the comment reaches the pull request.

Build results and the generated analysis remain separate evidence. A passing build cannot establish that the review understood the requirement, and a confident review still needs to be checked against the change.
