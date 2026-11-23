---
title: "Photo Exports Without Changing the Subject"
date: 2026-11-03
lastmod: 2026-11-03
draft: false
author: Mishael Ochu
description: "Separating subject preservation, background blur, and color-managed exports for a small photo set."
tags: [image-processing, color-management, publishing]
---

The task was ordinary: prepare three photos for social posting, with a crop and an optional background blur. I wanted the person in the photos preserved, without generative replacement or face and body retouching.

That makes the processing boundary concrete. The background can change while the foreground remains the original image content.

### Define what the edit is allowed to change

The workflow combined a manually guided outline with GrabCut segmentation. A background-only normalized Gaussian convolution supplied the blur. The edit receipt recorded the crop, method, and foreground comparison for each image.

An exact foreground match is useful evidence about the compositing step. It is not a claim that every pixel in the final social JPEG remains identical to the camera file. Resizing, color conversion, and JPEG encoding are additional transformations.

Keeping those operations separate makes the result easier to explain and reproduce.

### Treat the color profile as part of the image

The original files included Display P3 profiles. The lossless masters retained those profiles, while the social JPEG exports were converted to sRGB. The exports were 1080 by 1350 pixels, with location metadata omitted.

The distinction between assigning a profile and converting the pixels matters. A profile describes how to interpret the existing values; a conversion changes values to preserve the intended appearance in another color space. Simply discarding that information can change how an image looks elsewhere.

The review comparison also needed appropriate color handling. Otherwise a side-by-side could make the editing decision depend on an inconsistent preview rather than the actual crop or blur.

### Keep an original, a master, and an export

These files serve different purposes. The original preserves the input. The master retains the edited working result without JPEG loss. The export fits a specific publishing use.

Recording the method and retaining those stages makes a later change less expensive. I can choose another crop or output size without rebuilding the image from a compressed social download.

For a three-photo task, this is a modest amount of process. It protects the specific promise behind the edit: make the image easier to publish while keeping the subject recognizably and verifiably intact.
