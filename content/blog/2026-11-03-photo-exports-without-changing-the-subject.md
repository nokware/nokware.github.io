---
title: "Photo Exports Without Changing the Subject"
date: 2026-11-03
lastmod: 2026-11-23
draft: false
author: Mishael Ochu
description: "Separating subject preservation, background blur, and color-managed exports for a small photo set."
tags: [image-processing, color-management, publishing]
---

I needed three photos prepared for social posting, with a crop and optional background blur. The person in each photo had to remain the original image content, with no generative replacement or face and body retouching.

### Isolate the permitted edit

The workflow used a manually guided outline with GrabCut segmentation. A background-only normalized Gaussian convolution supplied the blur. Each edit receipt recorded the crop, method and foreground comparison.

The foreground comparison checked the compositing step. Resizing, color conversion and JPEG encoding then applied their own transformations to the social export. Recording those steps separately made the comparison meaningful.

### Preserve the color information

The original files had Display P3 profiles. The lossless masters retained them, while the 1080-by-1350-pixel social JPEGs were converted to sRGB and had location metadata omitted.

A profile describes how to interpret pixel values. Converting to another color space changes those values to preserve their intended appearance. Discarding the profile can change the appearance instead, so the review comparison also needed consistent color handling.

I retained the original input and a lossless edited master alongside each social export. That lets me change the crop or output size later without starting from a compressed JPEG.
