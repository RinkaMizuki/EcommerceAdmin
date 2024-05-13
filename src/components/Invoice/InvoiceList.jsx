import * as React from 'react';
import {
  List,
  DatagridConfigurable,
  TextField,
  DateField,
  NumberField,
  DateInput,
  TopToolbar,
  ExportButton,
  SelectColumnsButton,
  ReferenceInput,
  FilterButton,
  Pagination,
  AutocompleteInput,
  WrapperField,
  useRecordContext,
} from 'react-admin';

import InvoiceShow from './InvoiceShow';
import { AvatarField } from '../Field/AvatarField';
import { Typography } from '@mui/material';

const CustomerField = (props) => {
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
        data={record.user}
        sx={{
          mr: 1,
          mt: -0.5,
          mb: -0.5,
        }}
      />
      {record.order.fullName?.length > 11 ? record.order.fullName.slice(0, 11) + '...' : record.order.fullName}
    </Typography>
  ) : null;
};


const listFilters = [
  <DateInput source="passedSince" alwaysOn />,
  <DateInput source="passedBefore" alwaysOn />,
  <ReferenceInput source="userId" reference="users" label="Users">
    <AutocompleteInput
      label="User"
      optionText={(choice) =>
        choice?.id // the empty choice is { id: '' }
          ? `${choice.userName}`
          : ''
      }
      sx={{ minWidth: 200 }}
    />
  </ReferenceInput>,
  <ReferenceInput source="orderId" reference="orders" />,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <SelectColumnsButton />
    <ExportButton />
  </TopToolbar>
);

const InvoiceList = () => {

  return (
    <List
      filters={listFilters}
      perPage={6}
      pagination={<Pagination
        rowsPerPageOptions={[6, 12, 24, 30]} />
      }
      sort={{ field: 'createdAt', order: 'DESC' }}
      actions={<ListActions />}
    >
      <DatagridConfigurable
        rowClick="expand"
        expand={<InvoiceShow />}
        sx={{
          '& .column-customer_id': {
            display: { xs: 'none', md: 'table-cell' },
          },
          '& .column-total_ex_taxes': {
            display: { xs: 'none', md: 'table-cell' },
          },
          '& .column-delivery_fees': {
            display: { xs: 'none', md: 'table-cell' },
          },
          '& .column-taxes': {
            display: { xs: 'none', md: 'table-cell' },
          },
        }}
      >
        <TextField
          source="id"
          sx={{
            maxWidth: "100px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block"
          }}
        />
        <DateField source="createdAt" />
        <WrapperField source="Customer" sortBy='order.fullName'>
          <CustomerField />
        </WrapperField>
        <TextField
          label="Delivery Address"
          source="order.deliveryAddress"
          sx={{
            maxWidth: "300px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block"
          }}
        />
        <TextField
          sortBy='order.orderId'
          source="order.id"
          label="Order"
          sx={{
            maxWidth: "100px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block"
          }}
        />
        <TextField
          source="paymentStatus"
          label="Status"
        />
        <NumberField
          source="paidAmout"
          options={{
            style: 'currency',
            currency: 'VND',
          }}
          locales="fr-FR"
          sx={{ fontWeight: 'bold' }}
        />

      </DatagridConfigurable>
    </List>
  )
};

export default InvoiceList;