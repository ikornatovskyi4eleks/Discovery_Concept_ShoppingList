import { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import { MESSAGES } from './types';
import type { Item } from './types';
import type { SaveResult } from './useItems';

interface Props {
  open: boolean;
  item: Item | null;
  onClose: () => void;
  onConfirm: (id: string) => SaveResult;
}

export default function DeleteDialog({ open, item, onClose, onConfirm }: Props) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) setError(null);
  }, [open]);

  function handleDelete() {
    if (!item) return;
    const result = onConfirm(item.id);
    if (result === 'failed') {
      setError(MESSAGES.deleteFailed);
      return;
    }
    if (result === 'missing') {
      setError(MESSAGES.itemGone);
      return;
    }
    onClose();
  }

  const titleId = 'delete-dialog-title';

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby={titleId} fullWidth maxWidth="xs">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 2, pb: 2, pl: 3, pr: 2 }}>
        <DialogTitle id={titleId} sx={{ p: 0 }}>
          Delete this item?
        </DialogTitle>

        <IconButton aria-label="Close" onClick={onClose} sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 2, pb: 2 }}>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          <DialogContentText sx={{ fontSize: '1rem' }}>
            {item ? `"${item.name}" will be removed from the shopping list.` : null}
          </DialogContentText>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        {/* Cancel is the safe default and takes focus. Delete is never the page primary. */}
        <Button onClick={onClose} color="inherit" autoFocus size="large">
          Cancel
        </Button>
        {/* error.main on white text is ~3.2:1, under the 4.5:1 AA floor for this
            text size. error.dark clears it (~6.6:1). */}
        <Button
          onClick={handleDelete}
          variant="contained"
          size="large"
          sx={{
            bgcolor: 'error.dark',
            color: 'error.contrastText',
            '&:hover': { bgcolor: 'error.darker' },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
