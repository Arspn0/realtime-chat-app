// ============================================================
//  COMPREHENSIVE THEME SYSTEM
//  3 Themes × 2 Modes (light/dark) = 6 complete design sets
//  Each theme includes: colors, typography, spacing, borders,
//  shadows, animations, transitions, and component styles.
// ============================================================

export const THEMES = {
  MINIMALIST: 'minimalist',
  NEO_BRUTALISM: 'neo-brutalism',
  RETRO: 'retro',
} as const;

export type ThemeKey = (typeof THEMES)[keyof typeof THEMES];
export type ThemeMode = 'light' | 'dark';

export const FONTS = {
  minimalist: {
    display: 'DMSerifDisplay-Regular',
    body: 'DMSans-Regular',
    mono: 'DMSans-Regular',
  },
  'neo-brutalism': {
    display: 'BebasNeue-Regular',
    body: 'SpaceMono-Regular',
    mono: 'SpaceMono-Regular',
  },
  retro: {
    display: 'VT323-Regular',
    body: 'CourierPrime-Regular',
    mono: 'CourierPrime-Regular',
  },
} as const;

// ─────────────────────────────────────────────────────────────
//  TYPOGRAPHY SCALE
// ─────────────────────────────────────────────────────────────

export const typographyScale = {
  minimalist: {
    // Clean, precise, optical-size-aware
    displayXl: { fontSize: '2.5rem', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.04em' },
    displayLg: { fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.03em' },
    heading: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.3, letterSpacing: '-0.02em' },
    subheading: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.4, letterSpacing: '-0.01em' },
    body: { fontSize: '0.9375rem', fontWeight: 400, lineHeight: 1.6, letterSpacing: '0em' },
    caption: { fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0.01em' },
    label: { fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.4, letterSpacing: '0.06em', textTransform: 'uppercase' },
    timestamp: { fontSize: '0.6875rem', fontWeight: 400, lineHeight: 1.4, letterSpacing: '0.02em' },
  },
  'neo-brutalism': {
    // Bold, chunky, raw — matches the image reference
    displayXl: { fontSize: '3rem', fontWeight: 700, lineHeight: 1.0, letterSpacing: '0.02em', textTransform: 'uppercase' },
    displayLg: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.05, letterSpacing: '0.01em', textTransform: 'uppercase' },
    heading: { fontSize: '1.125rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '0em' },
    subheading: { fontSize: '1rem', fontWeight: 700, lineHeight: 1.3, letterSpacing: '0em' },
    body: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6, letterSpacing: '0em' },
    caption: { fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0em' },
    label: { fontSize: '0.75rem', fontWeight: 700, lineHeight: 1.4, letterSpacing: '0.08em', textTransform: 'uppercase' },
    timestamp: { fontSize: '0.6875rem', fontWeight: 400, lineHeight: 1.4, letterSpacing: '0.02em' },
  },
  retro: {
    // Pixelated + typewriter feel, loose tracking
    displayXl: { fontSize: '2.75rem', fontWeight: 400, lineHeight: 1.1, letterSpacing: '0.05em' },
    displayLg: { fontSize: '1.875rem', fontWeight: 400, lineHeight: 1.15, letterSpacing: '0.04em' },
    heading: { fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.3, letterSpacing: '0.03em' },
    subheading: { fontSize: '1.0625rem', fontWeight: 400, lineHeight: 1.4, letterSpacing: '0.02em' },
    body: { fontSize: '0.9375rem', fontWeight: 400, lineHeight: 1.7, letterSpacing: '0.01em' },
    caption: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6, letterSpacing: '0.02em' },
    label: { fontSize: '0.8125rem', fontWeight: 700, lineHeight: 1.4, letterSpacing: '0.1em', textTransform: 'uppercase' },
    timestamp: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.4, letterSpacing: '0.03em' },
  },
} as const;

// ─────────────────────────────────────────────────────────────
//  BORDER RADIUS
// ─────────────────────────────────────────────────────────────

export const borderRadius = {
  minimalist: {
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
    // Component-specific
    card: '16px',
    button: '10px',
    input: '10px',
    avatar: '50%',
    badge: '9999px',
    bubble: '18px',    // Chat bubble
    bubbleTail: '4px', // The "tail" corner of bubble
  },
  'neo-brutalism': {
    // Per referensi gambar: mostly sharp/square, slight rounding on cards
    none: '0px',
    xs: '2px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
    // Component-specific
    card: '12px',
    button: '6px',
    input: '6px',
    avatar: '50%',
    badge: '4px',      // Square-ish badges
    bubble: '8px',     // Blocky chat bubble
    bubbleTail: '2px',
  },
  retro: {
    // Chunky, slightly beveled feel
    none: '0px',
    xs: '2px',
    sm: '4px',
    md: '4px',
    lg: '6px',
    xl: '8px',
    full: '9999px',
    // Component-specific
    card: '4px',
    button: '4px',
    input: '2px',
    avatar: '50%',
    badge: '2px',      // Nearly square
    bubble: '4px',
    bubbleTail: '0px',
  },
} as const;

// ─────────────────────────────────────────────────────────────
//  SPACING SYSTEM
// ─────────────────────────────────────────────────────────────

export const spacing = {
  minimalist: {
    // 4px base grid, generous whitespace
    '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px',
    '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px',
    '16': '64px',
    chatPadding: '20px',
    bubblePaddingV: '10px',
    bubblePaddingH: '14px',
    messageGap: '8px',
  },
  'neo-brutalism': {
    // 4px base grid, tighter density
    '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px',
    '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px',
    '16': '64px',
    chatPadding: '16px',
    bubblePaddingV: '8px',
    bubblePaddingH: '12px',
    messageGap: '6px',
  },
  retro: {
    // Generous, old-school layout feel
    '0': '0px', '1': '4px', '2': '8px', '3': '12px', '4': '16px',
    '5': '20px', '6': '24px', '8': '32px', '10': '40px', '12': '48px',
    '16': '64px',
    chatPadding: '16px',
    bubblePaddingV: '8px',
    bubblePaddingH: '10px',
    messageGap: '4px',
  },
} as const;

// ─────────────────────────────────────────────────────────────
//  SHADOW / ELEVATION SYSTEM
// ─────────────────────────────────────────────────────────────

export const shadows = {
  minimalist: {
    // Subtle, diffuse shadows — no harsh lines
    light: {
      none: 'none',
      xs: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
      sm: '0 2px 8px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)',
      md: '0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05)',
      lg: '0 8px 32px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)',
      xl: '0 16px 48px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.07)',
      card: '0 2px 12px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
      bubble: '0 2px 8px rgba(0,122,255,0.12)',
      input: '0 0 0 3px rgba(0,122,255,0.15)',  // Focus ring
      nav: '0 -1px 16px rgba(0,0,0,0.08)',
    },
    dark: {
      none: 'none',
      xs: '0 1px 3px rgba(0,0,0,0.3)',
      sm: '0 2px 8px rgba(0,0,0,0.35)',
      md: '0 4px 16px rgba(0,0,0,0.4)',
      lg: '0 8px 32px rgba(0,0,0,0.45)',
      xl: '0 16px 48px rgba(0,0,0,0.5)',
      card: '0 2px 12px rgba(0,0,0,0.4)',
      bubble: '0 2px 8px rgba(10,132,255,0.2)',
      input: '0 0 0 3px rgba(10,132,255,0.25)',
      nav: '0 -1px 16px rgba(0,0,0,0.4)',
    },
  },

  'neo-brutalism': {
    // ★ SIGNATURE NEO-BRUTALISM: hard offset shadow, no blur
    // Matches the reference image — everything has a solid black shadow
    light: {
      none: 'none',
      xs: '2px 2px 0px #000000',
      sm: '3px 3px 0px #000000',
      md: '4px 4px 0px #000000',
      lg: '6px 6px 0px #000000',
      xl: '8px 8px 0px #000000',
      card: '4px 4px 0px #000000',
      bubble: '3px 3px 0px #000000',
      input: '3px 3px 0px #000000',
      inputFocus: '4px 4px 0px #000000',   // Grows on focus
      button: '4px 4px 0px #000000',
      buttonActive: '1px 1px 0px #000000', // Shrinks on press
      nav: '0px -3px 0px #000000',
    },
    dark: {
      none: 'none',
      xs: '2px 2px 0px #FFFFFF',
      sm: '3px 3px 0px #FFFFFF',
      md: '4px 4px 0px #FFFFFF',
      lg: '6px 6px 0px #FFFFFF',
      xl: '8px 8px 0px #FFFFFF',
      card: '4px 4px 0px #FFFFFF',
      bubble: '3px 3px 0px #FFFFFF',
      input: '3px 3px 0px #FFFFFF',
      inputFocus: '4px 4px 0px #FFFFFF',
      button: '4px 4px 0px #FFFFFF',
      buttonActive: '1px 1px 0px #FFFFFF',
      nav: '0px -3px 0px #FFFFFF',
    },
  },

  retro: {
    // ★ SIGNATURE RETRO: inset/bevel effect simulating old Windows/CRT
    // Light = Windows 95/98 raised border trick
    light: {
      none: 'none',
      xs: 'inset -1px -1px 0px #808080, inset 1px 1px 0px #FFFFFF',
      sm: 'inset -2px -2px 0px #808080, inset 2px 2px 0px #FFFFFF',
      md: 'inset -2px -2px 0px #696969, inset 2px 2px 0px #F0F0F0, 2px 2px 4px rgba(0,0,0,0.15)',
      lg: '3px 3px 8px rgba(0,0,0,0.25), inset -1px -1px 0px #808080, inset 1px 1px 0px #FFFFFF',
      xl: '4px 4px 12px rgba(0,0,0,0.3)',
      card: 'inset -2px -2px 0px #8C7B70, inset 2px 2px 0px #F5ECD7, 2px 2px 0px rgba(0,0,0,0.2)',
      bubble: '2px 2px 0px rgba(0,0,0,0.2)',
      input: 'inset 2px 2px 3px rgba(0,0,0,0.2), inset -1px -1px 2px rgba(255,255,255,0.6)',
      inputFocus: 'inset 2px 2px 3px rgba(0,0,0,0.25), 0 0 0 1px #D9534F',
      button: 'inset -2px -2px 0px #6B4A3A, inset 2px 2px 0px #EDD9B5', // Raised button
      buttonActive: 'inset 2px 2px 0px #6B4A3A, inset -2px -2px 0px #EDD9B5', // Pressed button
      nav: 'inset 0px 2px 0px #FFFFFF, 0 -1px 0px #8C7B70',
    },
    dark: {
      none: 'none',
      xs: 'inset -1px -1px 0px #1A1410, inset 1px 1px 0px #5C4B3F',
      sm: 'inset -2px -2px 0px #1A1410, inset 2px 2px 0px #5C4B3F',
      md: 'inset -2px -2px 0px #1A1410, inset 2px 2px 0px #5C4B3F, 2px 2px 4px rgba(0,0,0,0.4)',
      lg: '3px 3px 8px rgba(0,0,0,0.5)',
      xl: '4px 4px 12px rgba(0,0,0,0.6)',
      card: 'inset -2px -2px 0px #1A1410, inset 2px 2px 0px #5C4B3F',
      bubble: '2px 2px 0px rgba(0,0,0,0.4)',
      input: 'inset 2px 2px 3px rgba(0,0,0,0.5), inset -1px -1px 2px rgba(255,255,255,0.05)',
      inputFocus: 'inset 2px 2px 3px rgba(0,0,0,0.5), 0 0 0 1px #D9534F',
      button: 'inset -2px -2px 0px #1A1410, inset 2px 2px 0px #5C4B3F',
      buttonActive: 'inset 2px 2px 0px #1A1410, inset -2px -2px 0px #5C4B3F',
      nav: 'inset 0px 2px 0px #5C4B3F',
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────
//  BORDER STYLES
// ─────────────────────────────────────────────────────────────

export const borders = {
  minimalist: {
    width: { none: '0px', thin: '1px', medium: '1.5px', thick: '2px' },
    style: 'solid',
    // No heavy borders — subtle separators only
    card: '1px solid',
    input: '1.5px solid',
    inputFocus: '1.5px solid',
    button: '1.5px solid',
    divider: '1px solid',
    bubble: '0px solid',
  },
  'neo-brutalism': {
    // ★ SIGNATURE: thick solid black borders everywhere (see reference image)
    width: { none: '0px', thin: '2px', medium: '3px', thick: '4px' },
    style: 'solid',
    card: '3px solid',
    input: '3px solid',
    inputFocus: '3px solid',
    button: '3px solid',
    divider: '2px solid',
    bubble: '2.5px solid',
  },
  retro: {
    // Double or solid borders, Windows-like
    width: { none: '0px', thin: '1px', medium: '2px', thick: '3px' },
    style: 'solid',
    card: '2px solid',
    input: '2px solid',
    inputFocus: '2px solid',
    button: '2px solid',
    divider: '1px solid',
    bubble: '1px solid',
  },
} as const;

// ─────────────────────────────────────────────────────────────
//  ANIMATION & TRANSITION SYSTEM
// ─────────────────────────────────────────────────────────────

export const animation = {
  minimalist: {
    // Fluid, physics-inspired, Apple-like easing
    duration: {
      instant: '0ms',
      fast: '120ms',
      normal: '220ms',
      slow: '380ms',
      xslow: '600ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',    // Material standard
      enter: 'cubic-bezier(0.0, 0, 0.2, 1)',       // Decelerate in
      exit: 'cubic-bezier(0.4, 0, 1, 1)',          // Accelerate out
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Springy overshoot
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    // Full CSS transition strings for components
    transitions: {
      default: 'all 220ms cubic-bezier(0.4, 0, 0.2, 1)',
      fast: 'all 120ms cubic-bezier(0.4, 0, 0.2, 1)',
      color: 'color 180ms cubic-bezier(0.4, 0, 0.2, 1), background-color 180ms cubic-bezier(0.4, 0, 0.2, 1)',
      shadow: 'box-shadow 220ms cubic-bezier(0.4, 0, 0.2, 1)',
      transform: 'transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      opacity: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    // Keyframe animation names (define in global CSS)
    keyframes: {
      messageIn: 'minimalist-message-in 280ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      fadeIn: 'fade-in 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
      slideUp: 'slide-up 260ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      pulse: 'minimalist-pulse 1.5s ease-in-out infinite',  // Typing indicator
    },
  },

  'neo-brutalism': {
    // ★ SIGNATURE: snappy, no-nonsense, slightly mechanical
    // Very fast with slight "snap" feeling — no smooth curves
    duration: {
      instant: '0ms',
      fast: '80ms',
      normal: '150ms',
      slow: '250ms',
      xslow: '400ms',
    },
    easing: {
      default: 'steps(1)',                         // Instant toggle (optional use)
      snap: 'cubic-bezier(0.25, 0.1, 0.25, 1)',   // Sharp snap
      enter: 'cubic-bezier(0.0, 0, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0, 1, 1)',
      bounce: 'cubic-bezier(0.36, 0.07, 0.19, 0.97)', // Heavy bounce
    },
    transitions: {
      // Button press: translate to simulate shadow collapse
      default: 'all 80ms cubic-bezier(0.25, 0.1, 0.25, 1)',
      fast: 'all 60ms cubic-bezier(0.25, 0.1, 0.25, 1)',
      color: 'background-color 80ms steps(1), color 80ms steps(1)',
      shadow: 'box-shadow 80ms cubic-bezier(0.25, 0.1, 0.25, 1), transform 80ms cubic-bezier(0.25, 0.1, 0.25, 1)',
      transform: 'transform 80ms cubic-bezier(0.25, 0.1, 0.25, 1)',
      opacity: 'opacity 100ms steps(2)',
      // ★ IMPORTANT: button active state — shadow shrinks + element shifts
      buttonPress: 'transform 60ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 60ms cubic-bezier(0.25, 0.1, 0.25, 1)',
    },
    keyframes: {
      // Message slides in with a "thud"
      messageIn: 'neo-message-in 150ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
      fadeIn: 'fade-in 100ms steps(2) forwards',
      slideUp: 'slide-up 150ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
      // Typing indicator: 3 blocks bouncing sequentially
      typingPulse: 'neo-typing 0.6s steps(1) infinite',
      shake: 'neo-shake 300ms cubic-bezier(0.36, 0.07, 0.19, 0.97)',
    },
  },

  retro: {
    // ★ SIGNATURE: slow, deliberate, CRT-scanline feel
    // Emulates the feel of old PC interfaces with slower, chunkier transitions
    duration: {
      instant: '0ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      xslow: '800ms',
    },
    easing: {
      default: 'steps(4)',                          // Stepped, pixelated
      typewriter: 'steps(1)',                       // Per-character typewriter
      chunky: 'cubic-bezier(0.0, 0.0, 0.58, 1)',   // Old-school ease-out
      enter: 'steps(6)',
      exit: 'steps(4)',
    },
    transitions: {
      default: 'all 300ms steps(4)',
      fast: 'all 150ms steps(2)',
      color: 'background-color 200ms steps(4), color 200ms steps(4)',
      shadow: 'box-shadow 150ms steps(2)',
      transform: 'transform 300ms steps(6)',
      opacity: 'opacity 200ms steps(4)',
      buttonPress: 'box-shadow 100ms steps(1), transform 100ms steps(1)',
    },
    keyframes: {
      // Messages appear with a typewriter / CRT scanline effect
      messageIn: 'retro-message-in 400ms steps(8) forwards',
      fadeIn: 'retro-fade-in 300ms steps(6) forwards',
      scanline: 'retro-scanline 8s linear infinite',
      blink: 'retro-blink 1s steps(1) infinite',    // Cursor blink
      crtFlicker: 'retro-flicker 0.15s infinite',   // Very subtle screen flicker
      typingPulse: 'retro-cursor 0.8s steps(1) infinite',
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────
//  COMPONENT-SPECIFIC STYLES (ready-to-use CSS-in-JS objects)
// ─────────────────────────────────────────────────────────────

export const componentStyles = {
  minimalist: {
    // --- BUTTON ---
    button: {
      primary: {
        fontFamily: FONTS.minimalist.body,
        fontWeight: 500,
        fontSize: '0.9375rem',
        letterSpacing: '-0.01em',
        padding: '10px 20px',
        borderRadius: borderRadius.minimalist.button,
        border: 'none',
        cursor: 'pointer',
        transition: animation.minimalist.transitions.default,
      },
      // Hover: subtle lift
      primaryHover: { transform: 'translateY(-1px)', boxShadow: '0 4px 16px rgba(0,122,255,0.3)' },
      primaryActive: { transform: 'translateY(0)', boxShadow: 'none' },
    },
    // --- INPUT ---
    input: {
      fontFamily: FONTS.minimalist.body,
      fontSize: '0.9375rem',
      padding: '10px 14px',
      borderRadius: borderRadius.minimalist.input,
      border: `${borders.minimalist.input} transparent`,
      outline: 'none',
      transition: `${animation.minimalist.transitions.default}, ${animation.minimalist.transitions.shadow}`,
    },
  },

  'neo-brutalism': {
    // --- BUTTON --- matches reference image (yellow + black border + hard shadow)
    button: {
      primary: {
        fontFamily: FONTS['neo-brutalism'].body,
        fontWeight: 700,
        fontSize: '0.875rem',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        padding: '10px 20px',
        borderRadius: borderRadius['neo-brutalism'].button,
        border: `${borders['neo-brutalism'].button} #000000`,
        cursor: 'pointer',
        // Default offset shadow
        boxShadow: shadows['neo-brutalism'].light.button,
        transition: animation['neo-brutalism'].transitions.buttonPress,
        // IMPORTANT: When active/pressed, shift position to match shadow collapse
        // In React: onMouseDown: transform translateX(3px) translateY(3px) + shadow shrinks to 1px 1px
      },
      primaryActive: {
        transform: 'translate(3px, 3px)',
        boxShadow: shadows['neo-brutalism'].light.buttonActive,
      },
    },
    // --- INPUT --- heavy border, minimal radius
    input: {
      fontFamily: FONTS['neo-brutalism'].body,
      fontSize: '0.875rem',
      padding: '10px 12px',
      borderRadius: borderRadius['neo-brutalism'].input,
      border: `${borders['neo-brutalism'].input} #000000`,
      outline: 'none',
      boxShadow: shadows['neo-brutalism'].light.input,
      transition: animation['neo-brutalism'].transitions.shadow,
    },
    inputFocus: {
      boxShadow: shadows['neo-brutalism'].light.inputFocus,
    },
  },

  retro: {
    // --- BUTTON --- raised bevel effect
    button: {
      primary: {
        fontFamily: FONTS.retro.body,
        fontWeight: 700,
        fontSize: '0.875rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        padding: '8px 16px',
        borderRadius: borderRadius.retro.button,
        border: `${borders.retro.button} transparent`,
        cursor: 'pointer',
        boxShadow: shadows.retro.light.button,
        transition: animation.retro.transitions.buttonPress,
        imageRendering: 'pixelated',
      },
      primaryActive: {
        boxShadow: shadows.retro.light.buttonActive,
        transform: 'translate(1px, 1px)',
      },
    },
    // --- INPUT --- inset sunken look
    input: {
      fontFamily: FONTS.retro.body,
      fontSize: '0.9375rem',
      padding: '8px 10px',
      borderRadius: borderRadius.retro.input,
      border: `${borders.retro.input} transparent`,
      outline: 'none',
      boxShadow: shadows.retro.light.input,
    },
    inputFocus: {
      boxShadow: shadows.retro.light.inputFocus,
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────
//  FULL COLOR PALETTE  (main themePalette export)
// ─────────────────────────────────────────────────────────────

export const themePalette = {

  // ═══════════════════════════════════════════════════════════
  //  MINIMALIST — Clean, flat, professional
  //  Inspired by Linear, Notion, Apple Notes
  //  Fonts: DM Sans (body) + DM Serif Display (headings)
  // ═══════════════════════════════════════════════════════════
  minimalist: {
    light: {
      // Core
      background: '#F7F7F8',
      backgroundElevated: '#FFFFFF',
      backgroundSunken: '#F0F0F3',
      text: '#0F0F12',
      textSecondary: '#6E6E80',
      textTertiary: '#A0A0B0',
      textInverse: '#FFFFFF',
      textPlaceholder: '#B8B8C8',

      // Brand
      primary: '#3B6EFF',        // Refined blue, not iOS default
      primaryHover: '#2D5FFF',
      primaryActive: '#1F4FEE',
      primarySurface: '#EEF2FF', // Very light tint for backgrounds
      primaryText: '#FFFFFF',

      // Semantic
      success: '#16B364',
      successSurface: '#ECFDF3',
      warning: '#F4A100',
      warningSurface: '#FFFBEB',
      error: '#F04438',
      errorSurface: '#FEF2F0',

      // UI Elements
      card: '#FFFFFF',
      cardHover: '#FAFAFA',
      border: '#E4E4EC',
      borderLight: '#EFEFF5',
      borderFocus: '#3B6EFF',
      divider: '#EFEFF5',

      // Chat-specific
      bubbleSelf: '#3B6EFF',          // Sent message bubble
      bubbleSelfText: '#FFFFFF',
      bubbleOther: '#FFFFFF',          // Received message bubble
      bubbleOtherText: '#0F0F12',
      bubbleOtherBorder: '#E4E4EC',
      inputBar: '#FFFFFF',
      inputBarBorder: '#E4E4EC',
      headerBg: 'rgba(247,247,248,0.85)', // Frosted header
      navBg: 'rgba(247,247,248,0.90)',
      navActive: '#3B6EFF',
      navInactive: '#A0A0B0',
      onlineIndicator: '#16B364',
      readReceipt: '#3B6EFF',

      // Special: avatar ring, selection highlight
      avatarRing: '#E4E4EC',
      selectionBg: '#EEF2FF',
    },
    dark: {
      background: '#0C0C0F',
      backgroundElevated: '#16161C',
      backgroundSunken: '#0A0A0D',
      text: '#F0F0F5',
      textSecondary: '#8E8EA8',
      textTertiary: '#5A5A72',
      textInverse: '#0F0F12',
      textPlaceholder: '#4A4A60',

      primary: '#5580FF',
      primaryHover: '#6B90FF',
      primaryActive: '#4470FF',
      primarySurface: '#1A1F3A',
      primaryText: '#FFFFFF',

      success: '#17D068',
      successSurface: '#0A1F14',
      warning: '#F5B800',
      warningSurface: '#1A1500',
      error: '#FF5555',
      errorSurface: '#1F0A0A',

      card: '#16161C',
      cardHover: '#1C1C24',
      border: '#2A2A38',
      borderLight: '#222230',
      borderFocus: '#5580FF',
      divider: '#222230',

      bubbleSelf: '#5580FF',
      bubbleSelfText: '#FFFFFF',
      bubbleOther: '#1C1C24',
      bubbleOtherText: '#F0F0F5',
      bubbleOtherBorder: '#2A2A38',
      inputBar: '#16161C',
      inputBarBorder: '#2A2A38',
      headerBg: 'rgba(12,12,15,0.90)',
      navBg: 'rgba(12,12,15,0.92)',
      navActive: '#5580FF',
      navInactive: '#5A5A72',
      onlineIndicator: '#17D068',
      readReceipt: '#5580FF',

      avatarRing: '#2A2A38',
      selectionBg: '#1A1F3A',
    },
  },

  // ═══════════════════════════════════════════════════════════
  //  NEO-BRUTALISM — Based on provided reference image
  //  Yellow-cream palette, black borders, hard shadows
  //  Fonts: Bebas Neue (display) + Space Mono (body)
  // ═══════════════════════════════════════════════════════════
  'neo-brutalism': {
    light: {
      // Core — cream/yellow palette from reference
      background: '#FFF9EE',      // Warm cream (like reference background)
      backgroundElevated: '#FFFDF7',
      backgroundSunken: '#FFF3D6',
      text: '#000000',
      textSecondary: '#333333',
      textTertiary: '#666666',
      textInverse: '#000000',
      textPlaceholder: '#888888',

      // Brand — Yellow is THE accent (reference: yellow buttons, yellow highlights)
      primary: '#FFE600',          // Pure electric yellow (reference "I'M DONE!" button)
      primaryHover: '#F5DC00',
      primaryActive: '#E6CE00',
      primarySurface: '#FFFCE0',
      primaryText: '#000000',      // Black text on yellow

      // Secondary accent — teal/cyan (reference: "SHARE" button)
      secondary: '#4DD8D0',        // Teal
      secondaryHover: '#3BCBC2',
      secondaryActive: '#2FBDB5',
      secondaryText: '#000000',

      // Accent — coral/red-orange (reference: star icons, timing text)
      accent: '#FF6B35',           // Warm orange-red
      accentSurface: '#FFE8DC',

      // Semantic
      success: '#00C851',
      successSurface: '#E0FFE8',
      warning: '#FFB800',
      warningSurface: '#FFF8DC',
      error: '#FF3B30',
      errorSurface: '#FFE0DE',

      // UI Elements — everything has a black border
      card: '#FFFFFF',
      cardHover: '#FFFAF2',
      border: '#000000',           // ★ BLACK BORDER everywhere
      borderLight: '#000000',
      borderFocus: '#FFE600',
      divider: '#000000',

      // Badge/tag colors (reference: green username badges)
      badgePrimary: '#C8FF00',     // Acid green (reference username tags)
      badgePrimaryText: '#000000',
      badgeSecondary: '#FFE600',
      badgeSecondaryText: '#000000',

      // Chat-specific
      bubbleSelf: '#FFE600',        // Yellow sent bubble
      bubbleSelfText: '#000000',
      bubbleSelfBorder: '#000000',
      bubbleOther: '#FFFFFF',
      bubbleOtherText: '#000000',
      bubbleOtherBorder: '#000000',
      inputBar: '#FFFFFF',
      inputBarBorder: '#000000',
      headerBg: '#FFF9EE',
      navBg: '#FFF9EE',
      navActive: '#000000',
      navInactive: '#888888',
      navIndicator: '#FFE600',     // Active nav underline (reference: yellow blob)
      onlineIndicator: '#00C851',
      readReceipt: '#FFE600',

      avatarRing: '#000000',        // Black ring around avatars
      selectionBg: '#FFF3D6',
    },
    dark: {
      background: '#141414',
      backgroundElevated: '#1E1E1E',
      backgroundSunken: '#0F0F0F',
      text: '#FFFFFF',
      textSecondary: '#CCCCCC',
      textTertiary: '#888888',
      textInverse: '#FFFFFF',
      textPlaceholder: '#666666',

      primary: '#FFE600',           // Yellow stays vibrant in dark too
      primaryHover: '#F5DC00',
      primaryActive: '#E6CE00',
      primarySurface: '#2A2600',
      primaryText: '#000000',

      secondary: '#4DD8D0',
      secondaryHover: '#3BCBC2',
      secondaryActive: '#2FBDB5',
      secondaryText: '#000000',

      accent: '#FF6B35',
      accentSurface: '#2A1200',

      success: '#00C851',
      successSurface: '#001A0A',
      warning: '#FFB800',
      warningSurface: '#1A1200',
      error: '#FF3B30',
      errorSurface: '#1A0808',

      card: '#1E1E1E',
      cardHover: '#242424',
      border: '#FFFFFF',            // White borders in dark mode
      borderLight: '#FFFFFF',
      borderFocus: '#FFE600',
      divider: '#FFFFFF',

      badgePrimary: '#C8FF00',
      badgePrimaryText: '#000000',
      badgeSecondary: '#FFE600',
      badgeSecondaryText: '#000000',

      bubbleSelf: '#FFE600',
      bubbleSelfText: '#000000',
      bubbleSelfBorder: '#FFFFFF',
      bubbleOther: '#2D2D2D',
      bubbleOtherText: '#FFFFFF',
      bubbleOtherBorder: '#FFFFFF',
      inputBar: '#1E1E1E',
      inputBarBorder: '#FFFFFF',
      headerBg: '#141414',
      navBg: '#141414',
      navActive: '#FFFFFF',
      navInactive: '#666666',
      navIndicator: '#FFE600',
      onlineIndicator: '#00C851',
      readReceipt: '#FFE600',

      avatarRing: '#FFFFFF',
      selectionBg: '#2A2600',
    },
  },

  // ═══════════════════════════════════════════════════════════
  //  RETRO — Late 90s / Early 2000s PC feel
  //  Think: Windows 98, ICQ, early AIM, pixel fonts, bevel buttons
  //  Fonts: VT323 (display) + Courier Prime (body)
  // ═══════════════════════════════════════════════════════════
  retro: {
    light: {
      // Core — aged paper + warm earth tones
      background: '#D4C5A9',       // Aged parchment / manila folder
      backgroundElevated: '#E8DCCA', // Lighter raised surfaces
      backgroundSunken: '#C4B598', // Sunken/inset areas
      backgroundDesktop: '#008080', // ★ Classic Windows teal desktop
      text: '#1A120A',
      textSecondary: '#4A3A2A',
      textTertiary: '#7A6A5A',
      textInverse: '#FFFFFF',
      textPlaceholder: '#8A7A6A',

      // Accent — period-authentic colors
      primary: '#000080',          // ★ Classic Windows navy blue
      primaryHover: '#0000A0',
      primaryActive: '#000060',
      primarySurface: '#C3D4E8',   // Light blue selected state
      primaryText: '#FFFFFF',

      secondary: '#008080',        // Windows teal
      secondaryText: '#FFFFFF',

      accent: '#800000',           // Maroon
      accentBright: '#FF0000',     // Pure red for alerts

      // Windows 98-style system colors
      btnFace: '#D4C5A9',          // Standard button face
      btnHighlight: '#F5ECD7',     // Button top-left edge
      btnShadow: '#8C7B70',        // Button bottom-right edge
      btnDkShadow: '#4A3A2A',      // Deep shadow
      btnText: '#000000',

      // Semantic
      success: '#008000',          // Classic web green
      successSurface: '#C8E8C8',
      warning: '#808000',          // Olive warning
      warningSurface: '#E8E8C0',
      error: '#FF0000',
      errorSurface: '#FFD0D0',

      // UI Elements
      card: '#D4C5A9',
      cardHover: '#DDD0B5',
      border: '#8C7B70',
      borderLight: '#C4B598',
      borderHighlight: '#F5ECD7',  // Bevel highlight
      borderFocus: '#000080',
      divider: '#8C7B70',

      // Chat — Inspired by ICQ/AIM chat windows
      bubbleSelf: '#C3D4E8',       // Pale blue (AIM sent)
      bubbleSelfText: '#000000',
      bubbleSelfBorder: '#8C7B70',
      bubbleOther: '#E8DCCA',      // Cream (AIM received)
      bubbleOtherText: '#000000',
      bubbleOtherBorder: '#8C7B70',
      inputBar: '#E8DCCA',
      inputBarBorder: '#8C7B70',
      headerBg: '#000080',         // Navy header like Windows title bar
      headerText: '#FFFFFF',
      navBg: '#D4C5A9',
      navActive: '#000080',
      navActiveText: '#FFFFFF',
      navInactive: '#4A3A2A',
      navIndicator: '#FF0000',
      onlineIndicator: '#00FF00',  // Bright ICQ green
      readReceipt: '#000080',

      // Title bar gradient (Windows 98 style)
      titleBarFrom: '#000080',
      titleBarTo: '#1084D0',

      avatarRing: '#8C7B70',
      selectionBg: '#000080',
      selectionText: '#FFFFFF',

      // Scanline / CRT overlay (use as pseudo-element background)
      scanlineColor: 'rgba(0,0,0,0.03)',
    },
    dark: {
      // Dark retro = CRT terminal / MS-DOS feel
      background: '#0A0A0A',       // Very dark, near black
      backgroundElevated: '#1A1410',
      backgroundSunken: '#050505',
      backgroundDesktop: '#003333', // Dark teal terminal
      text: '#C8B078',             // Amber phosphor
      textSecondary: '#A09060',
      textTertiary: '#706040',
      textInverse: '#0A0A0A',
      textPlaceholder: '#504030',

      primary: '#00FF41',          // ★ Matrix/terminal green (alternatively: #FFA500 amber)
      primaryHover: '#00CC33',
      primaryActive: '#009922',
      primarySurface: '#001A00',
      primaryText: '#000000',

      secondary: '#00FFFF',        // Cyan terminal
      secondaryText: '#000000',

      accent: '#FF6600',           // Orange-amber accent
      accentBright: '#FF0000',

      btnFace: '#1A1410',
      btnHighlight: '#3D2F24',
      btnShadow: '#050505',
      btnDkShadow: '#000000',
      btnText: '#C8B078',

      success: '#00FF41',
      successSurface: '#001A00',
      warning: '#FFA500',
      warningSurface: '#1A0D00',
      error: '#FF0000',
      errorSurface: '#1A0000',

      card: '#1A1410',
      cardHover: '#221A14',
      border: '#3D2F24',
      borderLight: '#2A2018',
      borderHighlight: '#5C4B3F',
      borderFocus: '#00FF41',
      divider: '#3D2F24',

      // Chat — CRT terminal feel
      bubbleSelf: '#001A00',       // Very dark green
      bubbleSelfText: '#00FF41',   // Green text on dark green
      bubbleSelfBorder: '#00FF41',
      bubbleOther: '#1A1410',
      bubbleOtherText: '#C8B078',  // Amber
      bubbleOtherBorder: '#3D2F24',
      inputBar: '#0A0A0A',
      inputBarBorder: '#3D2F24',
      headerBg: '#001A00',
      headerText: '#00FF41',
      navBg: '#0A0A0A',
      navActive: '#00FF41',
      navActiveText: '#000000',
      navInactive: '#504030',
      navIndicator: '#00FF41',
      onlineIndicator: '#00FF41',
      readReceipt: '#00FF41',

      titleBarFrom: '#003300',
      titleBarTo: '#006600',

      avatarRing: '#3D2F24',
      selectionBg: '#00FF41',
      selectionText: '#000000',

      // Phosphor glow effect (use as text-shadow or filter)
      phosphorGlow: '0 0 8px rgba(0,255,65,0.6), 0 0 2px rgba(0,255,65,0.9)',
      phosphorGlowAmber: '0 0 8px rgba(255,160,0,0.5), 0 0 2px rgba(255,160,0,0.8)',
      scanlineColor: 'rgba(0,0,0,0.12)',
    },
  },

} as const;

// ─────────────────────────────────────────────────────────────
//  MASTER THEME OBJECT  (convenience export)
//  Combines everything into one object for context/provider use
// ─────────────────────────────────────────────────────────────
export interface ThemeConfig {
  colors: typeof themePalette[ThemeKey][ThemeMode];
  fonts: typeof FONTS[ThemeKey];
  typography: typeof typographyScale[ThemeKey];
  borderRadius: typeof borderRadius[ThemeKey];
  borders: typeof borders[ThemeKey];
  shadows: typeof shadows[ThemeKey][ThemeMode];
  spacing: typeof spacing[ThemeKey];
  animation: typeof animation[ThemeKey];
  componentStyles: typeof componentStyles[ThemeKey];
}

export function getTheme(themeKey: ThemeKey, mode: ThemeMode): ThemeConfig {
  return {
    colors: themePalette[themeKey][mode],
    fonts: FONTS[themeKey],
    typography: typographyScale[themeKey],
    borderRadius: borderRadius[themeKey],
    borders: borders[themeKey],
    shadows: shadows[themeKey][mode],
    spacing: spacing[themeKey],
    animation: animation[themeKey],
    componentStyles: componentStyles[themeKey],
  };
}