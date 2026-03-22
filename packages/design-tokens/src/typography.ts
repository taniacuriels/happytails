/**
 * Typography tokens
 */

export const FONT_FAMILY = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: '"Fira Code", "Courier New", monospace',
} as const;

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

export const FONT_WEIGHT = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const LINE_HEIGHT = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

export const LETTER_SPACING = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
} as const;

export const TYPOGRAPHY = {
  heading: {
    h1: {
      fontSize: FONT_SIZE['4xl'],
      fontWeight: FONT_WEIGHT.bold,
      lineHeight: LINE_HEIGHT.tight,
    },
    h2: {
      fontSize: FONT_SIZE['3xl'],
      fontWeight: FONT_WEIGHT.bold,
      lineHeight: LINE_HEIGHT.tight,
    },
    h3: {
      fontSize: FONT_SIZE['2xl'],
      fontWeight: FONT_WEIGHT.semibold,
      lineHeight: LINE_HEIGHT.normal,
    },
  },
  body: {
    lg: {
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.normal,
      lineHeight: LINE_HEIGHT.normal,
    },
    base: {
      fontSize: FONT_SIZE.base,
      fontWeight: FONT_WEIGHT.normal,
      lineHeight: LINE_HEIGHT.normal,
    },
    sm: {
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.normal,
      lineHeight: LINE_HEIGHT.normal,
    },
  },
  label: {
    lg: {
      fontSize: FONT_SIZE.base,
      fontWeight: FONT_WEIGHT.semibold,
      lineHeight: LINE_HEIGHT.normal,
    },
    base: {
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.semibold,
      lineHeight: LINE_HEIGHT.normal,
    },
  },
} as const;
