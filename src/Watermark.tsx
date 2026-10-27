import { useState } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

/**
 * The open-product-question note required by Design.md.
 * Fixed bottom-centre, a theme text colour at reduced opacity, no new hue.
 * Collapsed by default; expands on click. It is not a logo.
 */

const OPEN_QUESTIONS = [
  'Add pattern',
  'Sign in page',
  'Whether an empty list opens the form',
  'Whether a status change keeps the row in the current filter',
  'Load error retry',
  'Button labels',
  'Accessibility',
  'Purchased control',
  'Empty-list wording',
  'No-match wording',
  'Delete confirmation wording',
];

export default function Watermark() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      component="aside"
      aria-label="Open product question"
      sx={{
        position: 'fixed',
        left: '50%',
        bottom: 3,
        transform: 'translateX(-50%)',
        maxWidth: (t) => t.spacing(38),
        color: 'text.secondary',
        opacity: 0.56,
        // Outline in the note's own colour, on the container radius.
        border: 1,
        borderColor: 'currentColor',
        borderRadius: 2,
        bgcolor: 'background.paper',
        // Below md there is no clear space for it, and a fixed note would cover
        // Add Item and the row controls.
        display: { xs: 'none', md: 'block' },
        zIndex: (t) => t.zIndex.appBar - 1,
      }}
    >
      <ButtonBase
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          p: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle2" component="h2">
          Open product question
        </Typography>
        {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
      </ButtonBase>

      {expanded && (
        <Box component="ul" sx={{ m: 0, px: 2, pb: 2, pl: 4 }}>
          {OPEN_QUESTIONS.map((question) => (
            <Typography key={question} component="li" variant="body2" sx={{ display: 'list-item' }}>
              {question}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
