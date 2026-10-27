import { useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

import DeleteDialog from './DeleteDialog';
import EmptyBasket from './EmptyBasket';
import Header from './Header';
import ItemDialog from './ItemDialog';
import StatusChip from './StatusChip';
import Watermark from './Watermark';
import { SMALL_SHADOW } from './theme';
import { MESSAGES } from './types';
import type { FilterValue, Item } from './types';
import { useItems } from './useItems';

/** Filter order is fixed: All, then To Buy, then Purchased. */
const FILTERS: FilterValue[] = ['All', 'To Buy', 'Purchased'];

/** Counter colours mirror the StatusChip tokens: neutral, warning, success. */
const FILTER_COUNT_COLORS: Record<FilterValue, { bgcolor: string; color: string }> = {
  All: { bgcolor: 'action.selected', color: 'text.primary' },
  'To Buy': { bgcolor: 'warning.lighter', color: 'warning.darker' },
  Purchased: { bgcolor: 'success.lighter', color: 'success.darker' },
};

export default function App() {
  const { items, loadState, reload, addItem, editItem, setStatus, deleteItem } = useItems();

  const [filter, setFilter] = useState<FilterValue>('All');
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [deleting, setDeleting] = useState<Item | null>(null);
  const [listError, setListError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // "All" keeps every item, added order within each group. Purchased sinks to the bottom.
  const visibleItems = useMemo(() => {
    const filtered = filter === 'All' ? items : items.filter((item) => item.status === filter);
    return [...filtered].sort(
      (a, b) => Number(a.status === 'Purchased') - Number(b.status === 'Purchased'),
    );
  }, [items, filter]);

  // Filter counts, computed from the same items the rows come from.
  const filterCounts = useMemo<Record<FilterValue, number>>(
    () => ({
      All: items.length,
      'To Buy': items.filter((item) => item.status === 'To Buy').length,
      Purchased: items.filter((item) => item.status === 'Purchased').length,
    }),
    [items],
  );

  const hasItems = items.length > 0;
  const ready = loadState === 'ready';

  function openAdd() {
    setEditing(null);
    setItemDialogOpen(true);
  }

  function openEdit(item: Item) {
    setEditing(item);
    setItemDialogOpen(true);
  }

  /** The status change keeps the selected filter, so the row may leave the view. */
  function handleToggleStatus(item: Item) {
    setListError(null);
    const nextStatus = item.status === 'To Buy' ? 'Purchased' : 'To Buy';
    const result = setStatus(item.id, nextStatus);
    if (result === 'failed') setListError(MESSAGES.saveFailed);
    if (result === 'missing') setListError(MESSAGES.itemGone);
    if (result === 'ok' && nextStatus === 'Purchased') {
      setToast(`Item "${item.name}" marked as purchased`);
    }
  }

  return (
    <>
      <Header />

      <Container maxWidth="md" sx={{ py: 5 }}>
        <Stack spacing={3}>
          <Paper component="section" aria-labelledby="list-title">
          <Stack spacing={3} sx={{ px: 3, py: 2 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}
            >
              <Typography id="list-title" variant="h6" component="h2">
                My Items
              </Typography>

              {ready && hasItems && (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<AddIcon />}
                  onClick={openAdd}
                >
                  Add item
                </Button>
              )}
            </Stack>

            {ready && hasItems && (
              <ToggleButtonGroup
                value={filter}
                exclusive
                size="small"
                aria-label="Filter the shopping list"
                onChange={(_event, next: FilterValue | null) => {
                  if (next !== null) setFilter(next);
                }}
                sx={{ alignSelf: 'flex-start' }}
              >
                {FILTERS.map((value) => (
                  <ToggleButton key={value} value={value} sx={{ textTransform: 'uppercase', gap: 3 }}>
                    <Box component="span">{value}</Box>
                    <Box
                      component="span"
                      sx={{
                        textTransform: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: (t) => t.spacing(2.5),
                        height: (t) => t.spacing(2.5),
                        px: 0.5,
                        borderRadius: '50%',
                        bgcolor: FILTER_COUNT_COLORS[value].bgcolor,
                        color: FILTER_COUNT_COLORS[value].color,
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                      }}
                    >
                      {filterCounts[value]}
                    </Box>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
          </Stack>

          {/* Loading. A Skeleton only, with no invented sentence. */}
          {loadState === 'loading' && (
            <Box sx={{ borderTop: 1, borderColor: 'divider', px: 3, py: 3 }}>
              <Stack spacing={2}>
                {[0, 1, 2].map((row) => (
                  <Skeleton key={row} variant="rounded" sx={{ height: (t) => t.spacing(5) }} />
                ))}
              </Stack>
            </Box>
          )}

          {/* Load error (S3). */}
          {loadState === 'error' && (
            <Box sx={{ borderTop: 1, borderColor: 'divider', px: 3, py: 8, textAlign: 'center' }}>
              <Stack spacing={3} sx={{ alignItems: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  {MESSAGES.loadFailed}
                </Typography>
                <Button variant="contained" color="primary" onClick={reload}>
                  Reload
                </Button>
              </Stack>
            </Box>
          )}

          {/* A failed status change is reported on the list. */}
          {ready && listError && (
            <Box sx={{ borderTop: 1, borderColor: 'divider', px: 3, pt: 3 }}>
              <Alert severity="error" onClose={() => setListError(null)}>
                {listError}
              </Alert>
            </Box>
          )}

          {/* Empty list (S1). */}
          {ready && !hasItems && (
            <Box sx={{ borderTop: 1, borderColor: 'divider', px: 3, py: 8, textAlign: 'center' }}>
              <Stack spacing={3} sx={{ alignItems: 'center' }}>
                <EmptyBasket />

                <Box>
                  <Typography variant="h6" component="p" color="textSecondary" sx={{ mb: 1 }}>
                    {MESSAGES.emptyList}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Add the first item you need to buy.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<AddIcon />}
                  onClick={openAdd}
                >
                  Add item
                </Button>
              </Stack>
            </Box>
          )}

          {/* No matching items (S2). The selected filter stays selected. */}
          {ready && hasItems && visibleItems.length === 0 && (
            <Box sx={{ borderTop: 1, borderColor: 'divider', px: 3, py: 8, textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                {MESSAGES.noMatch}
              </Typography>
            </Box>
          )}

          {ready && visibleItems.length > 0 && (
            <TableContainer sx={{ borderTop: 1, borderColor: 'divider' }}>
              <Table aria-labelledby="list-title">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: (t) => t.spacing(15) }}>Purchased</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right" sx={{ width: (t) => t.spacing(14) }}>
                      Quantity
                    </TableCell>
                    <TableCell sx={{ width: (t) => t.spacing(16) }}>Status</TableCell>
                    <TableCell sx={{ width: (t) => t.spacing(17) }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleItems.map((item) => {
                    const purchased = item.status === 'Purchased';
                    return (
                      <TableRow key={item.id} hover>
                        <TableCell>
                          {/* Kept after purchase so the shopper can return the item to To Buy. */}
                          <Checkbox
                            color="primary"
                            checked={purchased}
                            onChange={() => handleToggleStatus(item)}
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28, width: 28, height: 28 } }}
                            slotProps={{ input: { 'aria-label': `Purchased: ${item.name}` } }}
                          />
                        </TableCell>

                        {/* Truncate at the end of the name, never through its start. */}
                        <TableCell
                          sx={{
                            fontSize: '1rem',
                            maxWidth: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            ...(purchased && {
                              color: 'text.disabled',
                              textDecoration: 'line-through',
                            }),
                          }}
                          title={item.name}
                        >
                          {item.name}
                        </TableCell>

                        <TableCell
                          align="right"
                          sx={{ fontSize: '1rem', ...(purchased && { color: 'text.disabled' }) }}
                        >
                          x{item.quantity}
                        </TableCell>

                        <TableCell>
                          <StatusChip status={item.status} />
                        </TableCell>

                        <TableCell>
                          <IconButton
                            color="inherit"
                            onClick={() => openEdit(item)}
                            aria-label={`Edit ${item.name}`}
                            sx={{
                              width: 40,
                              height: 40,
                              mr: 2,
                              '&:hover': { bgcolor: (t) => alpha(t.palette.primary.main, t.palette.action.hoverOpacity) },
                            }}
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => setDeleting(item)}
                            aria-label={`Delete ${item.name}`}
                            sx={{ width: 40, height: 40 }}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          </Paper>
        </Stack>

        <ItemDialog
          open={itemDialogOpen}
          item={editing}
          onClose={() => setItemDialogOpen(false)}
          onSave={(name, quantity) => {
            const result = editing
              ? editItem(editing.id, name, quantity)
              : addItem(name, quantity);
            if (result === 'ok') {
              setToast(
                editing
                  ? `Item "${name}" successfully updated`
                  : `New item "${name}" successfully added`,
              );
            }
            return result;
          }}
        />

        <DeleteDialog
          open={deleting !== null}
          item={deleting}
          onClose={() => setDeleting(null)}
          onConfirm={(id) => {
            const name = deleting?.name;
            const result = deleteItem(id);
            if (result === 'ok' && name) {
              setToast(`Item "${name}" successfully deleted`);
            }
            return result;
          }}
        />

        <Snackbar
          open={toast !== null}
          autoHideDuration={4000}
          onClose={(_event, reason) => {
            if (reason === 'clickaway') return;
            setToast(null);
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          sx={{ left: (t) => `${t.spacing(3)} !important`, bottom: (t) => `${t.spacing(3)} !important` }}
        >
          <Alert
            severity="success"
            variant="standard"
            onClose={() => setToast(null)}
            sx={{ boxShadow: SMALL_SHADOW }}
          >
            {toast}
          </Alert>
        </Snackbar>

        <Watermark />
      </Container>
    </>
  );
}
