---
title: "Verify the Media Before Reclaiming the Disk Space"
date: 2026-09-09
lastmod: 2026-11-03
draft: false
author: Mishael Ochu
description: "Moving a video workspace between Windows and macOS with explicit verification and conflict preservation."
tags: [storage, verification, video]
---

Moving my editing work to a Mac Mini meant answering a less exciting question first: could I remove the large video files from the Windows laptop without losing something needed later?

A matching folder name was insufficient. The work included camera footage, proxies, project files, tracking data, analysis, and generated outputs. Some files already existed on the destination. A few project files differed.

### Inventory the work, then compare it

The migration inventoried 1,178 files in the local Raw tree and compared file contents using SHA-256. Missing files were transferred to the external SSD. Two differing project files were preserved separately rather than overwriting either version. Another 7,849 supporting files were copied and verified outside the Raw tree.

The important unit was a specific source file and its verified destination. A successful copy command was only one piece of evidence.

The process used staging locations for transfers, checked the resulting files, and retained manifests. Immediately before cleanup, size and modification-time checks helped catch changes made after the original inventory.

### Scope the cleanup as carefully as the copy

Cleanup removed 318 verified video and proxy files from Windows. It retained the remaining files and folder structure. The measured increase in free space was about 319.76 GiB.

That measured figure differs from the logical total of the removed files. Hard links and concurrent disk activity can make those numbers diverge. Recording both is more useful than forcing them into one supposedly exact result.

### Preserved files still need a usable workflow

The resulting arrangement keeps Windows as the camera-intake point and moves processing to the Mac. Future intake also needs to consult the destination archive, or intentional local cleanup can cause old footage to be copied back onto the laptop.

There is another boundary worth keeping explicit: file preservation does not prove every editing project opens correctly. Absolute Windows media paths may need relinking. Platform-specific scripts may need changes. Those are separate checks.

After cleanup, the external SSD held the retained video files. That makes its continued protection important; moving a file is not the same as creating a second independent copy.

The general lesson is simple enough to reuse elsewhere: define what must survive, compare contents, preserve conflicts, and make deletion depend on a recorded verification result.
