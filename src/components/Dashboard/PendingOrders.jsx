import * as React from 'react';
import { Card, CardHeader, List } from '@mui/material';
import { useTranslate } from 'react-admin';

import { PendingOrder } from './PendingOrder';

const PendingOrders = (props) => {
  const { orders = [] } = props;
  const translate = useTranslate();

  return (
    <Card sx={{ flex: 1 }}>
      <CardHeader title={translate('Pending orders')} />
      <List dense={true}>
        {orders.map(record => (
          <PendingOrder key={record.id} order={record} />
        ))}
      </List>
    </Card>
  );
};

export default PendingOrders;