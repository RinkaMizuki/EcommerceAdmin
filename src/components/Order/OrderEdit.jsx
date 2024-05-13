import * as React from 'react';
import {
  BooleanInput,
  DateField,
  Edit,
  Form,
  Labeled,
  PrevNextButtons,
  ReferenceField,
  SelectInput,
  TextField,
  Toolbar,
  WrapperField,
  useRecordContext,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Box, Grid, Typography, Link } from '@mui/material';

import Basket from './Basket';
import Totals from './Totals';

const OrderEdit = () => (
  <Edit title={<OrderTitle />} component="div">
    <OrderForm />
  </Edit>
);

const OrderTitle = () => {
  const record = useRecordContext();
  return record ? (
    <span>
      Order "{record.id}"
    </span>
  ) : null;
};

const CustomerDetails = () => {
  const record = useRecordContext();
  return (
    <div>
      <Typography
        component={RouterLink}
        color="primary"
        to={`/users/${record?.userId}`}
        style={{ textDecoration: 'none' }}
      >
        {record?.fullName}
      </Typography>
      <br />
      <Typography
        component={Link}
        color="primary"
        href={`mailto:${record?.email}`}
        style={{ textDecoration: 'none' }}
      >
        {record?.email}
      </Typography>
    </div>
  );
};

const CustomerAddress = () => {
  const record = useRecordContext();

  return (
    <div>
      <Typography>{`${record?.userAddresses[0]?.address}, ${record?.userAddresses[0]?.district}, ${record?.userAddresses[0]?.city}, ${record?.userAddresses[0]?.state}`}</Typography>
    </div>
  );
};

const Spacer = () => <Box mb={1}>&nbsp;</Box>;

const OrderForm = () => {
  return (
    <Form>
      <Box maxWidth="100">
        <PrevNextButtons
          filterDefaultValues={{ status: 'ordered' }}
        />
        <Card>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant="h6" gutterBottom>
                  Order
                </Typography>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    <Labeled source="orderDate">
                      <DateField source="orderDate" />
                    </Labeled>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Labeled source="id">
                      <TextField source="id" />
                    </Labeled>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    <SelectInput
                      sx={{
                        marginTop: "15px"
                      }}
                      source="status"
                      choices={[
                        {
                          id: 'delivered',
                          name: 'delivered',
                        },
                        {
                          id: 'ordered',
                          name: 'ordered',
                        },
                        {
                          id: 'cancelled',
                          name: 'cancelled',
                        },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Box mt={2}>
                      <BooleanInput
                        row={true}
                        source="returned"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  Customer
                </Typography>
                <WrapperField source="Customer">
                  <CustomerDetails />
                </WrapperField>
                <Spacer />

                <Typography variant="h6" gutterBottom>
                  Shipping Address
                </Typography>
                <ReferenceField
                  source="userId"
                  reference="users"
                  link={false}
                >
                  <CustomerAddress />
                </ReferenceField>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Labeled source='note'>
                  <TextField source='note' emptyText="No notes here"></TextField>
                </Labeled>
              </Grid>
            </Grid>
            <Spacer />

            <Typography variant="h6" gutterBottom>
              Items
            </Typography>
            <div>
              <Basket />
            </div>
            <Spacer />

            <Typography variant="h6" gutterBottom>
              Totals
            </Typography>
            <div>
              <Totals />
            </div>
          </CardContent>
          <Toolbar />
        </Card>
      </Box>
    </Form>
  );
};

export default OrderEdit;