import {
  Datagrid,
  Edit,
  EditButton,
  NumberField,
  Labeled,
  ReferenceManyField,
  SimpleForm,
  TextInput,
  useRecordContext,
  BooleanField,
  BooleanInput,
  TextField,
  WrapperField,
  ArrayField,
  ReferenceInput,
  SelectInput,
} from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import { Stack } from '@mui/material';

const CategoryEdit = () => (
  <Edit title={<CategoryTitle />}>
    <SimpleForm>
      <TextInput source="title" />
      <Categories />
      <RichTextInput source="description" />
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <BooleanInput source="status" />
        <BooleanInput source="hot" />
      </Stack>
      <Labeled label="Products" fullWidth>
        <ReferenceManyField
          reference="products"
          target="category"
          perPage={10}
        >
          <Datagrid
          >
            <WrapperField label="Name">
              <TextField
                source="title"
              />
            </WrapperField>
            <NumberField
              source="price"
              locales="fr-FR"
              options={{
                style: 'currency',
                currency: 'VND',
              }}
            />
            <NumberField source="productStock.stockQuantity" />
            <Stack>
            </Stack>
            <BooleanField source="hot" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </Labeled>
    </SimpleForm>
  </Edit>
);

const CategoryTitle = () => {
  const record = useRecordContext();

  return record ? (
    <span>
      Category "{record.title || null}"
    </span>
  ) : null;
};
const Categories = () => {
  const record = useRecordContext();
  return !record.parentCategoryId ? (
    <Labeled label="Child categories">
      <Edit>
        <ArrayField source="listProductCategoryChild">
          <Datagrid bulkActionButtons={false}>
            <TextField source="id" />
            <TextField source="title" />
            <EditButton />
          </Datagrid>
        </ArrayField>
      </Edit>
    </Labeled>
  ) : <ReferenceInput
    label="Parent category"
    source="parentCategoryId"
    reference="categories"
  >
    <SelectInput
      style={{ width: "15%" }}
      optionText="title"
      optionValue="id"
      label="Parent category"
      source="id"
      resettable
      disableValue='not_available'
    />
  </ReferenceInput>;
};
export default CategoryEdit; 