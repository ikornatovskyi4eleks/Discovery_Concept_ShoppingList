import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

/** An original, grey line-art basket illustration for the empty-list state. */
export default function EmptyBasket() {
  const theme = useTheme();
  const line = theme.palette.grey[400];
  const dot = theme.palette.grey[300];

  return (
    <Box sx={{ width: 96, height: 80 }}>
      <svg width="96" height="80" viewBox="0 0 120 100" aria-hidden="true">
        {/* Scattered dots, for the same loosely-confetti feel as the reference. */}
        <circle cx="18" cy="24" r="3" fill={dot} />
        <circle cx="100" cy="20" r="2.5" fill={dot} />
        <circle cx="104" cy="58" r="2" fill={dot} />
        <circle cx="12" cy="62" r="2" fill={dot} />
        <circle cx="60" cy="10" r="2" fill={dot} />

        {/* Handle. */}
        <path
          d="M44 38 Q60 14 76 38"
          fill="none"
          stroke={line}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Basket body. */}
        <path
          d="M28 38 L92 38 L82 84 Q82 88 78 88 L42 88 Q38 88 38 84 Z"
          fill="none"
          stroke={line}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Woven texture. */}
        <path
          d="M32 52 L88 52 M33.5 66 L86.5 66 M35 80 L85 80"
          stroke={line}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </Box>
  );
}
