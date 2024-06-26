import * as React from 'react';
import { Typography } from '@mui/material';

import { useRecordContext } from 'react-admin';
import { AvatarField } from './AvatarField';

export const UserNameField = (props) => {

  const { size } = props;
  const record = useRecordContext();
  return record ? (
    <Typography
      variant="body2"
      display="flex"
      flexWrap="nowrap"
      gap="10px"
      alignItems="center"
      component="div"
      sx={{
        ...props.sx,
        maxWidth: '200px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      <AvatarField
        record={record}
        size={size}
        sx={{
          mr: 1,
          mt: -0.5,
          mb: -0.5,
        }}
      />
      {record.userName?.length > 11 ? record.userName.slice(0, 11) + '...' : record.userName}
    </Typography>
  ) : null;
};
