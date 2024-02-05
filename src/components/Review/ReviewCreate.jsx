import * as React from 'react';
import {
  SimpleForm,
  Create,
  ReferenceInput,
  TextInput,
  DateInput,
  AutocompleteInput,
  required,
  useNotify,
  useRedirect,
  getRecordFromLocation,
} from 'react-admin';
import { useLocation } from 'react-router';

import StarRatingInput from './StarRatingInput';

const ReviewCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const location = useLocation();

  const onSuccess = (_) => {
    const record = getRecordFromLocation(location);
    notify('Created success');
    if (record && record.id) {
      redirect(`/products/${record.id}/rates`);
    } else {
      redirect(`/rates`);
    }
  };

  return (
    <Create mutationOptions={{ onSuccess }}>
      <SimpleForm
        defaultValues={{ status: 'pending' }}
      >
        <ReferenceInput
          source="userId"
          reference="users"
        >
          <AutocompleteInput
            validate={required()}
            optionText="userName"
          />
        </ReferenceInput>
        <ReferenceInput
          source="productId"
          reference="products"
        >
          <AutocompleteInput
            optionText="title"
            validate={required()}
          />
        </ReferenceInput>
        <DateInput
          source="createdAt"
          defaultValue={new Date()}
          validate={required()}
        />
        <StarRatingInput source="star" defaultValue={3} />
        <TextInput
          source="content"
          multiline
          fullWidth
          resettable
          validate={required()}
        />
      </SimpleForm>
    </Create>
  );
};

export default ReviewCreate;