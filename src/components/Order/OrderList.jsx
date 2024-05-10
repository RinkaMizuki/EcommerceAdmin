import * as React from 'react';
import { Fragment, useCallback } from 'react';
import {
  AutocompleteInput,
  BooleanField,
  Count,
  DatagridConfigurable,
  DateField,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  Pagination,
  ReferenceField,
  ReferenceInput,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
  WrapperField,
  useListContext,
} from 'react-admin';
import { Divider, Tabs, Tab } from '@mui/material';

import UserReferenceField from '../User/UserReferenceField';
import NbItemsField from './NbItemsField';

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <SelectColumnsButton />
    <ExportButton />
  </TopToolbar>
);

const OrderList = () => (
  <List
    filterDefaultValues={{ status: 'succeed' }}
    perPage={6}
    pagination={<Pagination
      rowsPerPageOptions={[6, 12, 24, 30]} />}
    filters={orderFilters}
    actions={<ListActions />}
  >
    <TabbedDatagrid />
  </List>
);

const orderFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput source="id" reference="users" label="Users">
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
];

const tabs = [
  { id: 'succeed', name: 'succeed' },
  { id: 'delivered', name: 'delivered' },
  { id: 'cancelled', name: 'cancelled' },
];

const TabbedDatagrid = () => {
  const listContext = useListContext();
  const { filterValues, setFilters, displayedFilters } = listContext;

  const handleChange = useCallback(
    (event, value) => {
      setFilters &&
        setFilters(
          { ...filterValues, status: value },
          displayedFilters,
          false // no debounce, we want the filter to fire immediately
        );
    },
    [displayedFilters, filterValues, setFilters]
  );

  return (
    <Fragment>
      <Tabs
        variant="fullWidth"
        centered
        value={filterValues.status}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map(choice => (
          <Tab
            key={choice.id}
            label={
              <span>
                {choice.name} (
                <Count
                  filter={{
                    ...filterValues,
                    status: choice.name,
                  }}
                  sx={{ lineHeight: 'inherit' }}
                />
                )
              </span>
            }
            value={choice.id}
          />
        ))}
      </Tabs>
      <Divider />
      <>
        {filterValues.status === 'succeed' && (
          <DatagridConfigurable
            rowClick="edit"
          >
            <DateField source="orderDate" showTime />
            <TextField source="id" />
            <WrapperField source="Users">
              <UserReferenceField />
            </WrapperField>

            <TextField source="deliveryAddress" sx={{
              maxWidth: "300px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block"
            }} />
            <WrapperField label="Nb Items">
              <NbItemsField />
            </WrapperField>
            <NumberField
              source="totalPrice"
              options={{
                style: 'currency',
                currency: 'VND',
              }}
              locales="fr-FR"
              sx={{ fontWeight: 'bold' }}
            />

          </DatagridConfigurable>
        )}
        {filterValues.status === 'delivered' && (
          <DatagridConfigurable
            rowClick="edit"
            omit={['total_ex_taxes', 'delivery_fees', 'taxes']}
          >
            <DateField source="date" showTime />
            <TextField source="reference" />
            <ReferenceField
              source="customer_id"
              reference="customers"
              link={false}
              label="resources.commands.fields.address"
            >
              <AddressField />
            </ReferenceField>
            <NbItemsField
              label="resources.commands.fields.nb_items"
              textAlign="right"
            />
            <NumberField
              source="total"
              options={{
                style: 'currency',
                currency: 'USD',
              }}
              sx={{ fontWeight: 'bold' }}
            />
            <BooleanField
              source="returned"
              sx={{ mt: -0.5, mb: -0.5 }}
            />
          </DatagridConfigurable>
        )}
        {filterValues.status === 'cancelled' && (
          <DatagridConfigurable
            rowClick="edit"
            omit={['total_ex_taxes', 'delivery_fees', 'taxes']}
          >
            <DateField source="date" showTime />
            <TextField source="reference" />
            <ReferenceField
              source="customer_id"
              reference="customers"
              link={false}
              label="resources.commands.fields.address"
            >
              <AddressField />
            </ReferenceField>
            <NbItemsField
              label="resources.commands.fields.nb_items"
              textAlign="right"
            />
            <NumberField
              source="total_ex_taxes"
              options={{
                style: 'currency',
                currency: 'USD',
              }}
            />
            <NumberField
              source="delivery_fees"
              options={{
                style: 'currency',
                currency: 'USD',
              }}
            />
            <NumberField
              source="taxes"
              options={{
                style: 'currency',
                currency: 'USD',
              }}
            />
            <NumberField
              source="total"
              options={{
                style: 'currency',
                currency: 'USD',
              }}
              sx={{ fontWeight: 'bold' }}
            />
          </DatagridConfigurable>
        )}
      </>
    </Fragment>
  );
};

export default OrderList;