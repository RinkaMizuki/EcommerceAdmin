import * as React from 'react';
import { Typography } from '@mui/material';

import { ReferenceField, useRecordContext } from 'react-admin';
import { AvatarField } from '../Field/AvatarField';

const CustomerAvatar = (props) => {
  const { size } = props;

  const record = useRecordContext();
  return (
    <AvatarField
      record={record}
      size={size}
      sx={{
        mr: 1,
        mt: -0.5,
        mb: -0.5,
      }}
    />
  )
}

const CustomerField = (props) => {
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
      <ReferenceField
        source="userId"
        reference="users"
      >
        <CustomerAvatar size={size} />
      </ReferenceField>
      {record.fullName?.length > 11 ? record.fullName.slice(0, 11) + '...' : record.fullName}
    </Typography>
  ) : null;
};

export default CustomerField;
