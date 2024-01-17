import { Show, SimpleShowLayout, TextField, DateField, RichTextField, EmailField, BooleanField } from 'react-admin';
import { AvatarField } from '../Field/AvatarField';

export const UserDetail = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="userName" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="role" />
      <DateField source="birthDate" />
      <BooleanField source="emailConfirm" />
      <BooleanField source="isActive" label="Ban" />
      <AvatarField label="Avatar" size="150"/>
    </SimpleShowLayout>
  </Show>
);