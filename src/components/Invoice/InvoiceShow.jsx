import * as React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Link, ReferenceField, TextField, useRecordContext } from 'react-admin';

import Basket from '../Order/Basket';

const InvoiceShow = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <Card sx={{ maxWidth: 900, margin: 'auto' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              MT Store
            </Typography>
          </Grid>
          <Grid item xs={6} container alignItems="flex-start" justifyContent="center" direction="column">
            <Typography variant="h6" gutterBottom align="left" sx={{ fontWeight: 'bold' }}>
              Invoice
            </Typography>
            <Typography variant="h6" gutterBottom align="left">
              {record.id}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} container alignContent="flex-start" direction="column">
            <TextField source="user.userName" sx={{ fontWeight: 'bold', fontSize: "18px" }} />
            <TextField source="order.deliveryAddress"
              sx={{
                maxWidth: "250px",
                overflow: "hidden",
                display: "block",
                whiteSpace: "wrap"
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} container alignContent="left" direction="column" justifyContent="flex-start">
            <Typography variant="h6" gutterBottom align="left" sx={{ fontWeight: 'bold' }}>
              Currency
            </Typography>
            <Typography variant="h8" gutterBottom align="left">
              {record.paymentCurrency}
            </Typography>
          </Grid>
        </Grid>
        <Box height={20}>&nbsp;</Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom align="left" sx={{ fontWeight: 'bold' }} >
              Date
            </Typography>
            <Typography gutterBottom align="left">
              {new Date(record?.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom align="left" sx={{ fontWeight: 'bold' }}>
              Order
            </Typography>
            <Link to={`/orders/${record?.order?.id}`}>
              <TextField
                source="id"
                align="left"
                component="p"
                gutterBottom
              />
            </Link>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom align="left" sx={{ fontWeight: 'bold' }} >
              Payment method
            </Typography>
            <Typography gutterBottom align="left">
              {record.paymentDestination?.desShortName}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom align="left" sx={{ fontWeight: 'bold' }}>
              Payment message
            </Typography>
            <Typography gutterBottom align="left">
              {record?.paymentMessage || "-"}
            </Typography>
          </Grid>
        </Grid>
        <Box margin="10px 0">
          <ReferenceField
            reference="orders"
            source="order.id"
            link={false}
          >
            <Basket />
          </ReferenceField>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InvoiceShow;