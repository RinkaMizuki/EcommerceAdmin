import {
  EmailField,
  List,
  TextField,
  SimpleList,
  EditButton,
  Pagination,
  BooleanField,
  ArrayField,
  SingleFieldList,
  ChipField,
  TopToolbar,
  CreateButton,
  ExportButton,
  SelectColumnsButton,
  DateField,
  DatagridConfigurable,
} from "react-admin";
import { useMediaQuery } from "@mui/material";
import UserBulkActionButtons from "../BulkActionButtons/UserBulkActionButtons";
import "./User.css";
import { UserNameField } from "../Field/UserNameField";
import { UserFilterSidebar } from "./UserFilter";

export const UserList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const UsersListActions = () => (
    <TopToolbar>
      <CreateButton />
      <SelectColumnsButton />
      <ExportButton />
    </TopToolbar>
  );
  return (
    <List
      sx={{
        marginTop: "15px",
      }}
      aside={<UserFilterSidebar />}
      perPage={6}
      pagination={<Pagination rowsPerPageOptions={[6, 12, 24, 30]} />}
      actions={<UsersListActions />}
    >
      {!isSmall ? (
        <DatagridConfigurable
          rowClick="edit"
          omit={["id", "birthDate"]}
          bulkActionButtons={<UserBulkActionButtons />}
          sx={{
            marginTop: "5px",
          }}
        >
          <TextField source="id" />
          <DateField source="birthDate" locales="fr-FR" />
          <UserNameField label="Users"></UserNameField>
          <EmailField source="email" />
          <TextField source="role" />
          <BooleanField source="emailConfirm" textAlign="center" />
          <BooleanField source="isActive" label="Ban" />
          <ArrayField source="segments">
            <SingleFieldList linkType={false}>
              <ChipField source="title" size="small" />
            </SingleFieldList>
          </ArrayField>
          <EditButton />
        </DatagridConfigurable>
      ) : (
        <SimpleList
          primaryText={(record) => record.userName}
          tertiaryText={(record) => record.email}
          secondaryText={(record) => record.role}
        />
      )}
    </List>
  );
};
