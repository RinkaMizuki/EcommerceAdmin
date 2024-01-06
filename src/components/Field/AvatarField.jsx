import * as React from 'react';
import { Avatar } from '@mui/material';
import { useRecordContext } from 'react-admin';

export const AvatarField = ({ size = '35', sx, data = null }) => {
  const record = useRecordContext();
  if (!record && !data) return null;
  return (
    <Avatar
      src={`${!data ? record.url : data.url}`}
      style={{ width: parseInt(size, 10), height: parseInt(size, 10) }}
      sx={sx}
      alt={`${!data ? record.avatar : data.avatar}`}
    />
  );
};