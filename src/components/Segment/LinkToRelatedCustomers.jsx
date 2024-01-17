import * as React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { stringify } from 'query-string';
import { useRecordContext } from 'react-admin';
import GroupIcon from '@mui/icons-material/Group';

const LinkToRelatedCustomers = () => {
  const record = useRecordContext();
  return (
    <Button
      size="small"
      color="primary"
      component={Link}
      to={{
        pathname: '/users',
        search: stringify({
          displayedFilters: JSON.stringify({}),
          filter: JSON.stringify({ segments: [record.title.toLowerCase()] }),
        }),
      }}
      state={{ _scrollToTop: true }}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <GroupIcon />
      <span style={{ marginTop: "2px", marginLeft: "5px" }}>Customers</span>
    </Button>
  );
};

export default LinkToRelatedCustomers;
