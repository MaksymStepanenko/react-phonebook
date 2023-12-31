import React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        my CONTACTS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
