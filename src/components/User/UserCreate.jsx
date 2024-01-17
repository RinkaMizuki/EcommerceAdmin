import { Create, SimpleForm, TextInput, DateInput, BooleanInput, PasswordInput, SelectInput, required } from 'react-admin';

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="userName" label="User Name" validate={required()} />
      <TextInput source="email" label="Email Address" validate={required()} />
      <TextInput source="phone" label="Phone Number" />
      <SelectInput source="role" choices={[
        { id: "admin", name: "Admin" },
        { id: "member", name: "Member" }
      ]} validate={required()} defaultValue="member" />
      <PasswordInput source="password" required />
      <DateInput label="Birth Date" source="birthDate" defaultValue={new Date()} />
      <BooleanInput label="Confirm Email" source="emailConfirm" />
    </SimpleForm>
  </Create>
);