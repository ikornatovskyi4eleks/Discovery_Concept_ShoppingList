import { createTheme } from '@mui/material/styles';

/**
 * Every value here is an extracted token from Design.md.
 * Nothing in this file is invented, and nothing is a Material UI default.
 */

// Minimal's palette carries two steps beyond the MUI shape.
declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
  interface TypeBackground {
    neutral: string;
  }
}

const GREY = {
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#1C252E',
  900: '#141A21',
};

// The single extracted border, used as divider and as every control edge.
const BORDER_COLOR = 'rgba(145, 158, 171, 0.20)';

// The single extracted container shadow (customShadows.card).
const CARD_SHADOW =
  '0 0 2px 0 rgba(145, 158, 171, 0.20), 0 12px 24px -4px rgba(145, 158, 171, 0.12)';

// A smaller shadow for a lighter-weight floating surface (a toast), scaled
// down from the same card shadow colour rather than a new one. Exported for
// the toast Alert: MuiAlert itself stays shadow-less, since it also renders
// nested inside a Paper (the list, the dialogs) where a shadow would read
// as a card inside a card.
export const SMALL_SHADOW =
  '0 1px 2px 0 rgba(145, 158, 171, 0.16), 0 2px 6px -1px rgba(145, 158, 171, 0.12)';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      lighter: '#C8FAD6',
      light: '#5BE49B',
      main: '#00A76F',
      dark: '#007867',
      darker: '#004B50',
      contrastText: '#FFFFFF',
    },
    success: {
      lighter: '#D3FCD2',
      light: '#77ED8B',
      main: '#22C55E',
      dark: '#118D57',
      darker: '#065E49',
      contrastText: '#FFFFFF',
    },
    warning: {
      lighter: '#FFF5CC',
      light: '#FFD666',
      main: '#FFAB00',
      dark: '#B76E00',
      darker: '#7A4100',
      contrastText: '#1C252E',
    },
    error: {
      lighter: '#FFE9D5',
      light: '#FFAC82',
      main: '#FF5630',
      dark: '#B71D18',
      darker: '#7A0916',
      contrastText: '#FFFFFF',
    },
    info: {
      lighter: '#CAFDF5',
      light: '#61F3F3',
      main: '#00B8D9',
      dark: '#006C9C',
      darker: '#003768',
      contrastText: '#FFFFFF',
    },
    grey: GREY,
    text: {
      primary: '#1C252E',
      secondary: '#637381',
      disabled: '#919EAB',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
      neutral: '#F4F6F8',
    },
    divider: BORDER_COLOR,
    action: {
      active: '#637381',
      hover: 'rgba(145, 158, 171, 0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(145, 158, 171, 0.16)',
      selectedOpacity: 0.08,
      focus: 'rgba(145, 158, 171, 0.24)',
      focusOpacity: 0.12,
      disabled: 'rgba(145, 158, 171, 0.80)',
      disabledBackground: 'rgba(145, 158, 171, 0.24)',
      disabledOpacity: 0.48,
      activatedOpacity: 0.12,
    },
  },

  shape: {
    // The one radius token. A container that wants the larger corner uses 2x.
    borderRadius: 8,
  },

  // Spacing base, extracted as 8px. All padding and gaps go through theme.spacing.
  spacing: 8,

  typography: {
    fontFamily: '"Public Sans", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    // Display: weight 700, line-height 1.25.
    h1: { fontWeight: 700, lineHeight: 1.25, fontSize: '2.5rem' },
    h2: { fontWeight: 700, lineHeight: 1.25, fontSize: '2rem' },
    h3: { fontWeight: 700, lineHeight: 1.25, fontSize: '1.5rem' },
    // Headings: weight 600, line-height 1.25.
    h4: { fontWeight: 600, lineHeight: 1.25, fontSize: '1.25rem' },
    h5: { fontWeight: 600, lineHeight: 1.25, fontSize: '1.125rem' },
    h6: { fontWeight: 600, lineHeight: 1.25, fontSize: '1.0625rem' },
    subtitle1: { fontWeight: 600, lineHeight: 1.5, fontSize: '0.875rem' },
    subtitle2: { fontWeight: 600, lineHeight: 1.5, fontSize: '0.875rem' },
    // Body: 14px, weight 400, line-height 1.5.
    body1: { fontWeight: 400, lineHeight: 1.5, fontSize: '0.875rem' },
    body2: { fontWeight: 400, lineHeight: 1.5, fontSize: '0.875rem' },
    // Caption floor: 12px.
    caption: { fontWeight: 400, lineHeight: 1.5, fontSize: '0.75rem' },
    button: { fontWeight: 700, fontSize: '0.875rem', textTransform: 'none' },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FFFFFF',
        },
      },
    },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: ({ theme: t }) => ({
          // One radius, one border, one shadow on every container.
          borderRadius: Number(t.shape.borderRadius) * 2,
          border: `1px solid ${t.palette.divider}`,
          boxShadow: CARD_SHADOW,
          backgroundImage: 'none',
        }),
      },
    },

    // Alert is built on Paper, so the container treatment above would give every
    // message a card border and shadow: a card inside a card, and a second radius.
    MuiAlert: {
      styleOverrides: {
        // The filled variant's text/icon colour falls back to a hardcoded
        // default instead of this palette's contrastText, since these
        // colours are supplied as literal hex rather than via
        // augmentColor(). Pin it explicitly per severity.
        root: ({ theme: t }) => ({
          border: 0,
          boxShadow: 'none',
          borderRadius: t.shape.borderRadius,
          fontWeight: t.typography.fontWeightMedium,
          '&.MuiAlert-filled.MuiAlert-colorSuccess': {
            color: t.palette.success.contrastText,
            '& .MuiAlert-icon': { color: t.palette.success.contrastText },
          },
          '&.MuiAlert-filled.MuiAlert-colorError': {
            color: t.palette.error.contrastText,
            '& .MuiAlert-icon': { color: t.palette.error.contrastText },
          },
          '&.MuiAlert-filled.MuiAlert-colorWarning': {
            color: t.palette.warning.contrastText,
            '& .MuiAlert-icon': { color: t.palette.warning.contrastText },
          },
          '&.MuiAlert-filled.MuiAlert-colorInfo': {
            color: t.palette.info.contrastText,
            '& .MuiAlert-icon': { color: t.palette.info.contrastText },
          },
          // The light/standard success alert: the same green, just its
          // lighter/darker shades (already extracted tokens), not a new hue.
          '&.MuiAlert-standard.MuiAlert-colorSuccess': {
            backgroundColor: t.palette.success.lighter,
            color: t.palette.success.darker,
            '& .MuiAlert-icon': { color: t.palette.success.darker },
          },
        }),
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderRadius: t.shape.borderRadius,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        }),
        // Two sizes in use: M (default) and L, for the one emphasised action per screen.
        sizeLarge: { height: 40, paddingInline: 16 },
        sizeMedium: { height: 36, paddingInline: 12 },
      },
    },

    // Controls: solid fill plus a visible border, in every state.
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          // The notch's hidden legend inherits font-size from here, not from
          // the input slot below, so it must match for the notch to stay
          // wide enough for the (now bigger) shrunk label.
          fontSize: '1rem',
          backgroundColor: t.palette.background.paper,
          borderRadius: t.shape.borderRadius,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: t.palette.divider,
            borderWidth: 1,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: t.palette.text.primary,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: t.palette.text.primary,
            borderWidth: 1,
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: t.palette.action.disabledBackground,
          },
          // The notch's hidden legend is sized by an internal MUI variant
          // rule (0.75em of this root's font), which wins over a plain
          // styleOverride on its own component. !important matches the
          // legend to the shrunk label's font-size below, so the notch
          // stays wide enough for it.
          '& legend': {
            fontSize: '0.875rem !important',
          },
        }),
        input: {
          fontSize: '1rem',
        },
      },
    },

    // Resting (unshrunk) label matches the input's font-size, so it reads
    // as one continuous size with the text the shopper is about to type.
    // The shrunk label is its own size, not a 0.75x scale of that: that
    // scale is what made it read as too small.
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          '&.MuiInputLabel-shrink': {
            fontSize: '0.875rem',
            transform: 'translate(14px, -9px) scale(1)',
          },
        },
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
        },
      },
    },

    // The filter is a control: solid fill plus a visible border, and default,
    // hover, and selected must each read differently.
    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          paddingInline: t.spacing(2),
          color: t.palette.text.secondary,
          backgroundColor: t.palette.background.paper,
          borderColor: t.palette.divider,
          '&:hover': { backgroundColor: t.palette.action.hover },
          '&.Mui-selected': {
            color: t.palette.text.primary,
            backgroundColor: t.palette.action.selected,
            '&:hover': { backgroundColor: t.palette.action.selected },
          },
          '&.Mui-disabled': {
            color: t.palette.action.disabled,
            borderColor: t.palette.action.disabledBackground,
          },
        }),
      },
    },

    // ToggleButtonGroup hides the shared edge between segments by default
    // (transparent border). Restore it so each segment reads as divided.
    MuiToggleButtonGroup: {
      styleOverrides: {
        grouped: ({ theme: t }) => ({
          '&:not(:first-of-type)': {
            borderLeft: `1px solid ${t.palette.divider}`,
          },
          '&.Mui-selected:not(:first-of-type)': {
            borderLeft: `1px solid ${t.palette.divider}`,
          },
        }),
      },
    },

    // Extracted table density: 56px row, 16px cell padding.
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          padding: t.spacing(2),
          borderBottom: `1px dashed ${t.palette.divider}`,
        }),
        head: ({ theme: t }) => ({
          backgroundColor: t.palette.background.neutral,
          color: t.palette.text.secondary,
          fontWeight: 600,
        }),
      },
    },
  },
});

export default theme;
