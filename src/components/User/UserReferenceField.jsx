import * as React from 'react';
import { ReferenceField } from 'react-admin';
import { UserNameField } from "../Field/UserNameField";


const UserReferenceField = (
  props
) => (
  <ReferenceField source="userId" reference="users" {...props} >
    <UserNameField />
  </ReferenceField>
);

export default UserReferenceField;