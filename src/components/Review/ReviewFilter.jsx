import * as React from 'react';
import {
  AutocompleteInput,
  DateInput,
  ReferenceInput,
  SearchInput,
  SelectInput,
} from 'react-admin';

const ReviewFilters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput
    source="status"
    choices={[
      { id: 'accepted', name: 'Accepted' },
      { id: 'pending', name: 'Pending' },
      { id: 'rejected', name: 'Rejected' },
    ]}
  />,
  <ReferenceInput source="userId" reference="users">
    <AutocompleteInput
      optionText={(choice) =>
        choice?.id // the empty choice is { id: '' }
          ? `${choice.userName}`
          : ''
      }
      sx={{ minWidth: 200 }}
    />
  </ReferenceInput>,
  <ReferenceInput source="productId" reference="products">
    <AutocompleteInput optionText="title" />
  </ReferenceInput>,
];

export default ReviewFilters;