import Chip from '@mui/material/Chip';

import type { ItemStatus } from './types';

/** Purchased must read as clearly different from To Buy. Colour signals state only. */
export default function StatusChip({ status }: { status: ItemStatus }) {
  const purchased = status === 'Purchased';
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        fontWeight: 600,
        fontSize: '0.875rem',
        borderRadius: 1,
        // warning.lighter/darker give ~7.4:1 contrast, well past the 4.5:1 AA floor.
        bgcolor: purchased ? 'success.lighter' : 'warning.lighter',
        color: purchased ? 'success.darker' : 'warning.darker',
      }}
    />
  );
}
