import Box from '@mui/material/Box';

import logoIcon from './assets/logo.svg';

/** Header wordmark: the supplied badge icon plus "shopping list", "list" in the accent colour. */
export default function Logo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Box component="img" src={logoIcon} alt="" sx={{ width: 34, height: 34, display: 'block' }} />

      <Box
        component="span"
        sx={{
          fontWeight: 800,
          fontSize: '1.5rem',
          lineHeight: 1,
          letterSpacing: '-0.01em',
          color: 'text.primary',
          whiteSpace: 'nowrap',
        }}
      >
        shopping<Box component="span" sx={{ color: 'primary.main' }}>list</Box>
      </Box>
    </Box>
  );
}
