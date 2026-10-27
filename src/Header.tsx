import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Logo from './Logo';

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: (t) => t.zIndex.appBar,
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          rowGap: 2,
        }}
      >
        <Logo />

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="primary">
            Sign in
          </Button>
          {/* Accent: the extracted warning token (yellow, dark contrast text), repurposed as a CTA. */}
          <Button variant="contained" color="warning">
            Start for free
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
