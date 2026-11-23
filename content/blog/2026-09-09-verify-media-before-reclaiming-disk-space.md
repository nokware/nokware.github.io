---
title: "Verify the Media Before Reclaiming the Disk Space"
date: 2026-09-09
lastmod: 2026-11-23
draft: false
author: Mishael Ochu
description: "Moving a video workspace between Windows and macOS with explicit verification and conflict preservation."
tags: [storage, verification, video]
---

Before removing video files from my Windows laptop, I needed to verify that the editing work had reached the external SSD used by my Mac Mini. The material included footage, proxies, project files, tracking data and generated outputs. Some destination files already existed, and a few project files differed.

### Compare the files

The migration inventoried 1,178 files in the local Raw tree and compared contents using SHA-256. Missing files were transferred to the SSD. Two differing project files were preserved separately. Another 7,849 supporting files were copied and verified outside the Raw tree.

Staging locations and manifests recorded each source file and its destination. Immediately before cleanup, size and modification-time checks helped identify changes made since the inventory.

### Remove the verified copies

Cleanup removed 318 verified video and proxy files from Windows and retained the remaining files and directory structure. Free space increased by about 319.76 GiB.

That measured increase differed from the logical total of the deleted files. Hard links and concurrent disk activity can affect the comparison, so the record retained both figures.

Windows remained the camera-intake point, with processing on the Mac. Future intake needed to check the destination archive so that intentional local cleanup would not cause old footage to be imported again.

The file checks covered preservation. Opening an editing project was a separate check because absolute Windows media paths could need relinking and platform-specific scripts could need changes. After cleanup, the retained video files were on the SSD, making protection of that drive part of the ongoing workflow.
