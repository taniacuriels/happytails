/**
 * Color palette
 */

export const COLORS = {
  // Primary - Warm orange for friendly, approachable brand
  primary: {
    50: '#fef6f0',
    100: '#fce9de',
    200: '#f9d3bd',
    300: '#f5b89a',
    400: '#f09866',
    500: '#ec7e3f',
    600: '#d86a2b',
    700: '#c45620',
    800: '#a8421a',
    900: '#8c3315',
  },
  
  // Secondary - Teal for trust and communication
  secondary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#145231',
  },
  
  // Neutral
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Status colors
  error: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981',
  info: '#3b82f6',
} as const;

export const SEMANTIC_COLORS = {
  text: {
    primary: COLORS.neutral[900],
    secondary: COLORS.neutral[600],
    disabled: COLORS.neutral[400],
  },
  background: {
    default: '#ffffff',
    secondary: COLORS.neutral[50],
  },
  border: {
    light: COLORS.neutral[200],
    default: COLORS.neutral[300],
  },
} as const;
