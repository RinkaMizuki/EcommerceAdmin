import { useParams } from 'react-router';
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
  useGetList,
} from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import { Stack } from '@mui/material';

// import ThumbnailField from '../products/ThumbnailField';
// import ProductRefField from '../products/ProductRefField';

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
            <NumberField source="quantity" />
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
      {record.title}
    </span>
  ) : null;
};
const Categories = () => {
  const { data, isLoading } = useGetList('categories');
  const record = useRecordContext();
  const params = useParams();

  return !record.parentCategoryId ? (
    <Edit>
      <ArrayField source="listProductCategoryChild">
        <Datagrid bulkActionButtons={false}>
          <TextField source="id" />
          <TextField source="title" />
          <EditButton />
        </Datagrid>
      </ArrayField>
    </Edit>
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
      choices={data?.map(obj => {
        // Kiểm tra xem cate có là id trùng với id trong parent cate
        if (obj.id == params.id) {
          // Sử dụng Object.assign để sao chép object và thêm key-value mới
          return Object.assign({}, obj, { "not_available": true });
        }
        // Trả về cate không thay đổi nếu không phải là cate cần thay đổi
        return obj;
      })}
      disableValue='not_available'
      isLoading={isLoading}
    />
  </ReferenceInput>;
};
export default CategoryEdit; 