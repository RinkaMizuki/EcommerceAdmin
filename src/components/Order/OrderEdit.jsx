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
  useRecordContext,
  useTranslate,
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
        {record?.userName}
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
  console.log(record);
  return (
    <div>
      <Typography>
        {record?.userName}
      </Typography>
      <Typography>{`${record?.userAddresses[0]?.address}, ${record?.userAddresses[0]?.district}, ${record?.userAddresses[0]?.city}, ${record?.userAddresses[0]?.state}`}</Typography>
      <Typography>
        {record?.city}, {record?.stateAbbr} {record?.zipcode}
      </Typography>
    </div>
  );
};

const Spacer = () => <Box mb={1}>&nbsp;</Box>;

const OrderForm = () => {
  const translate = useTranslate();
  return (
    <Form>
      <Box maxWidth="50em">
        <PrevNextButtons
          filterDefaultValues={{ status: 'succeed' }}
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
                <ReferenceField
                  source="id"
                  reference="users"
                  link={false}
                >
                  <CustomerDetails />
                </ReferenceField>
                <Spacer />

                <Typography variant="h6" gutterBottom>
                  Shipping Address
                </Typography>
                <ReferenceField
                  source="id"
                  reference="users"
                  link={false}
                >
                  <CustomerAddress />
                </ReferenceField>
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