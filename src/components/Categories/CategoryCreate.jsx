import { Box } from '@mui/material';
import React from 'react';
import { Create, SimpleForm, TextInput, BooleanInput, SelectInput, required, ReferenceInput, useGetList } from 'react-admin';


const RichTextInput = React.lazy(() =>
  import('ra-input-rich-text').then(module => ({
    default: module.RichTextInput,
  }))
);

export const CategoryCreate = () => {

  const { data, isLoading } = useGetList('categories');

  return (
    <Create>
      <SimpleForm>
        <Box sx={{
          display: "flex",
          gap: "30px",
        }}>
          <TextInput source="title" label="Title" validate={required()} />
          <ReferenceInput
            label="Parent category"
            source="parentCategoryId"
            reference="categories"
          >
            <SelectInput
              style={{ width: "15%" }}
              optionText="title"
              optionValue="id"
              label="Parent category"
              source="parentCategoryId"
              resettable
              emptyText="No parent category"
              emptyValue="-1"
              choices={data?.map(obj => {
                if (!obj.parentCategoryId) {
                  return obj;
                }
              })}
              disableValue='not_available'
              isLoading={isLoading}
            />
          </ReferenceInput>
        </Box>
        <RichTextInput source="description" label="Description" validate={req} />

        <BooleanInput label="Status" source="status" />
        <BooleanInput label="Hot" source="hot" />
      </SimpleForm>
    </Create>
  )
};
const req = [required()];