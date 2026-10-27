import { useEffect, useRef, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { MESSAGES, NAME_MAX, QUANTITY_MAX, QUANTITY_MIN } from './types';
import type { Item } from './types';
import type { SaveResult } from './useItems';

interface Props {
  open: boolean;
  /** The item being edited, or null when adding. */
  item: Item | null;
  onClose: () => void;
  onSave: (name: string, quantity: number) => SaveResult;
}

export default function ItemDialog({ open, item, onClose, onSave }: Props) {
  const isEdit = item !== null;

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [nameError, setNameError] = useState<string | null>(null);
  const [quantityError, setQuantityError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  // On open, show the current values for an edit, or an empty name and 1 for an add.
  useEffect(() => {
    if (!open) return;
    setName(item ? item.name : '');
    setQuantity(item ? String(item.quantity) : '1');
    setNameError(null);
    setQuantityError(null);
    setSaveError(null);
  }, [open, item]);

  function handleSave() {
    const trimmedName = name.trim();

    let nextNameError: string | null = null;
    if (trimmedName.length === 0) nextNameError = MESSAGES.nameRequired;
    else if (trimmedName.length > NAME_MAX) nextNameError = MESSAGES.nameTooLong;

    // A whole number only. An empty quantity fails.
    let nextQuantityError: string | null = null;
    const trimmedQuantity = quantity.trim();
    const isWholeNumber = /^\d+$/.test(trimmedQuantity);
    const parsed = isWholeNumber ? Number(trimmedQuantity) : Number.NaN;
    if (!isWholeNumber || parsed < QUANTITY_MIN || parsed > QUANTITY_MAX) {
      nextQuantityError = MESSAGES.quantityRange;
    }

    setNameError(nextNameError);
    setQuantityError(nextQuantityError);
    setSaveError(null);

    // Focus moves to the first field with an error. Entered values stay.
    if (nextNameError) {
      nameRef.current?.focus();
      return;
    }
    if (nextQuantityError) {
      quantityRef.current?.focus();
      return;
    }

    // A failed save keeps the dialog open and keeps the entered values.
    const result = onSave(trimmedName, parsed);
    if (result === 'failed') {
      setSaveError(MESSAGES.saveFailed);
      return;
    }
    if (result === 'missing') {
      setSaveError(MESSAGES.itemGone);
      return;
    }

    onClose();
  }

  const titleId = 'item-dialog-title';

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby={titleId} fullWidth maxWidth="xs">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 2, pb: 2, pl: 3, pr: 2 }}>
        <DialogTitle id={titleId} sx={{ p: 0 }}>
          {isEdit ? 'Edit item' : 'Add item'}
        </DialogTitle>

        <IconButton aria-label="Close" onClick={onClose} sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* No helper-text placeholder: an unset helperText renders no element,
          so the reserved blank row that inflated the gap below a field is
          gone, and this padding is the actual, accurate top/bottom gap. */}
      <DialogContent sx={{ pt: 2, pb: 2 }}>
        <Stack spacing={3}>
          {saveError && <Alert severity="error">{saveError}</Alert>}

          <TextField
            inputRef={nameRef}
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={nameError !== null}
            helperText={nameError}
            slotProps={{ htmlInput: { maxLength: NAME_MAX }, inputLabel: { shrink: true } }}
            fullWidth
            autoFocus
          />

          <TextField
            inputRef={quantityRef}
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            error={quantityError !== null}
            helperText={quantityError}
            slotProps={{
              htmlInput: { min: QUANTITY_MIN, max: QUANTITY_MAX, step: 1 },
              inputLabel: { shrink: true },
            }}
            sx={{ width: (t) => t.spacing(12) }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit" size="large">
          Cancel
        </Button>
        {/* Save stays enabled. It is the one primary action inside the dialog. */}
        <Button onClick={handleSave} variant="contained" color="primary" size="large">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
