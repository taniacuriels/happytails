# Design Tokens Package

Shared design language across all platforms.

## Exports

### Colors
- Primary palette (orange)
- Secondary palette (teal)
- Neutral grays
- Semantic colors (text, background, border)

### Typography
- Font families
- Font sizes
- Font weights
- Line heights
- Predefined typography styles

### Spacing
- Spatial scale (xs, sm, md, lg, xl, 2xl)
- Border radius
- Z-index scale

### Motion
- Animation durations (fast, normal, slow)

## Usage

```typescript
import { COLORS, SPACING, TYPOGRAPHY } from '@happytails/design-tokens';

const styles = {
  backgroundColor: COLORS.primary[500],
  padding: SPACING.md,
  fontSize: TYPOGRAPHY.body.base.fontSize,
};
```

## Design Philosophy

- **Warm & Approachable** - Primary orange conveys friendliness
- **Trust & Communication** - Secondary teal for connection
- **Accessible** - WCAG AA compliant contrast ratios
- **Consistent** - Same tokens across all platforms
