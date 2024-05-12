import * as React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { ReferenceField, TextField, useRecordContext } from 'react-admin';

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
          <Grid item xs={6} container alignItems="center" justifyContent="center" direction="column">
            <Typography variant="h6" gutterBottom align="right" sx={{ fontWeight: 'bold' }}>
              Invoice
            </Typography>
            <Typography variant="h6" gutterBottom align="right">
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
          <Grid item xs={12} md={6} container alignContent="center" direction="column" justifyContent="flex-start">
            <Typography variant="h6" gutterBottom align="right" sx={{ fontWeight: 'bold' }}>
              Currency
            </Typography>
            <Typography variant="h8" gutterBottom align="center">
              {record.paymentCurrency}
            </Typography>
          </Grid>
        </Grid>
        <Box height={20}>&nbsp;</Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold' }} >
              Date
            </Typography>
            <Typography gutterBottom align="center">
              {new Date(record.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
              Order
            </Typography>
            <TextField
              source="id"
              align="center"
              component="p"
              gutterBottom
            />
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