import * as React from 'react';
import {
  List,
  DatagridConfigurable,
  TextField,
  DateField,
  ReferenceField,
  NumberField,
  DateInput,
  TopToolbar,
  ExportButton,
  SelectColumnsButton,
  ReferenceInput,
  FilterButton,
  Pagination,
  AutocompleteInput,
} from 'react-admin';

import InvoiceShow from './InvoiceShow';

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

const InvoiceList = () => (
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
      <TextField source="user.userName" />
      <TextField source="order.deliveryAddress"
        sx={{
          maxWidth: "300px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          display: "block"
        }}
      />
      <TextField
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
);

export default InvoiceList;