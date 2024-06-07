import * as React from 'react';
import { Card, CardHeader, List, Typography } from '@mui/material';

import { PendingOrder } from './PendingOrder';

const PendingOrders = (props) => {
  const { orders = [] } = props;

  return (
    <Card sx={{ flex: 1 }}>
      <CardHeader title='Pending orders' />
      <List dense={true}>
        {orders?.length ?
          orders.map(record => (
            <PendingOrder key={record.id} order={record} />
          ))
          : <Typography textAlign="center">There are currently no pending orders.</Typography>}
      </List>
    </Card>
  );
};

export default PendingOrders;