// Dark navy/teal primary with orange accents

export const theme = {
  // Primary Colors - Dark Navy/Teal
  primary: {
    900: '#0a1929',  // Darkest
    800: '#0f2744',  // Main dark
    700: '#1a365d',  // Primary dark
    600: '#234681',  // Primary medium
    500: '#2d5a9e',  // Primary light
  },
  
  // Accent Colors - Orange
  accent: {
    500: '#f97316',  // Main orange
    400: '#fb923c',  // Light orange
    600: '#ea580c',  // Dark orange
  },
  
  // Neutral Colors
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Status Colors
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #0f2744 0%, #1a365d 50%, #234681 100%)',
    accent: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    hero: 'linear-gradient(135deg, #0a1929 0%, #0f2744 40%, #1a365d 100%)',
  }
};

// Legacy color names for backward compatibility
export const PRIMARY_GRADIENT = [theme.primary[800], theme.primary[700], theme.primary[600]];
export const ACCENT_COLOR = theme.accent[500];

export default theme;
