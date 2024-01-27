import * as React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import {
  CreateButton,
  ExportButton,
  FilterButton,
  FilterForm,
  FilterContext,
  ListBase,
  Pagination,
  ReferenceInput,
  SearchInput,
  SelectInput,
  SortButton,
  TopToolbar,
  Title
} from 'react-admin';


import ImageList from './GridList';
import Aside from './Aside';

export const ProductList = () => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));
  return (
    <>
      <Title title="Products"></Title>
      <ListBase perPage={12} sort={{ field: 'reference', order: 'ASC' }} >
        <FilterContext.Provider value={productFilters}>
          <ListActions isSmall={isSmall} />
          {isSmall && (
            <Box m={1}>
              <FilterForm />
            </Box>
          )}
        </FilterContext.Provider>
        <Box display="flex">
          <Aside />
          <Box width={isSmall ? 'auto' : 'calc(100% - 16em)'}>
            <ImageList />
            <Pagination rowsPerPageOptions={[12, 24, 48, 72]} />
          </Box>
        </Box>
      </ListBase>
    </>
  );
};

export const productFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput
    source="category_id"
    reference="categories"
    sort={{ field: 'id', order: 'ASC' }}
  >
    <SelectInput source="name" />
  </ReferenceInput>,
];

const ListActions = ({ isSmall }) => (
  <TopToolbar>
    {isSmall && <FilterButton />}
    <SortButton fields={['reference', 'sales', 'stock']} />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);