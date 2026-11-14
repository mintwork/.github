# mintwork brand

**Developer tools in mint condition.**

## The mark

A leaf drawn from two equal arcs on the 45° diagonal, with a negative-space vein that tapers from
the stem to a fine point two-thirds of the way to the tip. Fresh (mint), precise (one clean cut),
and legible down to 16px.

| | Light backgrounds | Dark backgrounds |
|---|---|---|
| Mark | `logo/mintwork-mark.svg` (ink) | `logo/mintwork-mark-mint.svg` (mint) |
| Lockup | `lockup/mintwork-lockup-light.png` | `lockup/mintwork-lockup-dark.png` |
| Lockup, leaf-dot "i" | `lockup/mintwork-lockup-leafdot-light.png` | `lockup/mintwork-lockup-leafdot-dark.png` |
| Avatar | `avatar/mintwork-avatar.svg` · `-1024.png` (ink on mint, the default) | `avatar/mintwork-avatar-dark.svg` · `-1024.png` |

Single-color use: `logo/mintwork-mark-white.svg`, or recolor the ink mark.

## Color

| Name | Hex | Use |
|---|---|---|
| Mint | `#7EE2B8` | Brand color: avatar field, mark on dark |
| Ink | `#0D1714` | Mark on light, text, dark fields |
| Paper | `#F4FBF8` | Light backgrounds |

Use one brand color per composition; don't add gradients or effects to the mark.

## Wordmark

`mintwork`, lowercase, in a heavy geometric sans (SF Pro Display / Inter, ~680 weight, -0.045em
tracking). The mark sits at the wordmark's x-height to cap height, with a gap of about 0.2× its width.
The leaf-dot variant replaces the dot of the *i* with the mark; use it for headers and social
images, and the plain wordmark wherever the mark already appears next to it at small sizes.

## Rules

- Clear space around the mark: at least the midrib's length on every side.
- Minimum size: 16px.
- Don't rotate, outline, recolor outside the palette, or put the mark on busy imagery.

## Files

- `favicon/`: `favicon.svg`, `favicon.ico` (16/32/48), and PNGs at 16, 32, 48, 180 (apple-touch), 192, 512.
- `build.mjs` regenerates everything from the geometry in one place (needs Chrome + ffmpeg).
