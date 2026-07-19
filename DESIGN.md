# Olfah Design System

## Overview

Olfah is a cinematic, image-led real-estate brand experience. The visual language combines forest greens, limestone neutrals, terracotta warmth, and late-afternoon light. Layouts are spacious and architectural, with thin rules, asymmetric image compositions, and restrained motion.

## Color

- Forest ink: `oklch(0.285 0.035 135)` for primary dark surfaces and text.
- Limestone: `oklch(0.944 0.015 92)` for warm light surfaces.
- Canopy mist: `oklch(0.866 0.035 125)` for secondary natural surfaces.
- Terracotta: `oklch(0.585 0.105 45)` for the committed warm chapter.
- Sage: `oklch(0.635 0.045 125)` for secondary copy and active states.
- Soft ivory: `oklch(0.968 0.012 88)` instead of pure white.

Never use pure black or pure white. Keep image overlays forest-tinted and avoid purple/blue gradients.

## Typography

- UI and body: Geist, weights 400, 500, and 600.
- Established display voice: Cormorant Garamond, weights 500 and 600, used only for large place-making headlines and property names.
- Body lines remain below 70 characters where practical.
- Headlines use fluid `clamp()` sizing with compact tracking and no more than three lines.

## Imagery

- Real project renders only for architecture and amenities.
- Late-afternoon photographic grade: warm directional highlights, gentle roll-off, balanced whites, deep natural foliage, clean skies, and subtle depth.
- Do not add, remove, move, regenerate, or distort architectural geometry. Organic planting, people and atmosphere may be rebuilt when needed for photographic realism, while the defining landscape layout stays anchored to the source.
- Do not add film grain, synthetic texture, halos, cross-hatching, or aggressive sharpening.
- Hero and gallery assets should be presentation-grade, with responsive loading and lazy loading below the fold.

## Layout

- Maximum content width: 1440px.
- Major chapters use fluid vertical spacing between 96px and 176px.
- Desktop may use asymmetric columns; mobile collapses to one stable column with 20px side padding.
- Use thin rules and negative space instead of nested cards.
- Gallery uses a dense 12-column composition with no empty cells.

## Components

- Header: transparent over the hero, warm limestone after scroll, high-contrast navigation, clear keyboard focus.
- Buttons: square architectural geometry, 46px minimum target height, clear active compression, no glow.
- Image panels: overflow hidden, subtle scale on hover, no filters that obscure render quality.
- Forms: labels above fields, helper/error text below, complete idle/loading/error/success states.
- Lightbox: full-resolution image viewing with keyboard navigation, close control, counter, and restrained forest backdrop.

## Motion

- GSAP ScrollTrigger powers isolated image-led sequences and is cleaned up on unmount.
- Animate only transform and opacity.
- Use exponential ease-out curves; avoid bounce and elastic motion.
- Respect `prefers-reduced-motion` and keep content visible when animation is disabled.
