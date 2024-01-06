import { Admin, Resource } from "react-admin"
import { UserList } from "../components/UserList/UserList"
import { dataProvider } from "../contexts/dataProvider"
import { authProvider } from "../contexts/authProvider"
import LoginPage from "../pages/LoginPage";
import { UserCreate } from "../components/UserCreate/UserCreate";
import { UserEdit } from "../components/UserEdit/UserEdit";
import { UserDetail } from "../components/UserDetail/UserDetail";
import UserIcon from "@mui/icons-material/Group";
import { LayoutDefault } from "../components/Layout/LayoutDefault";

const AdminPanel = () => {

  return (
    <Admin layout={LayoutDefault} dataProvider={dataProvider} authProvider={authProvider} loginPage={LoginPage}>
      <Resource name="users" list={UserList} show={UserDetail} create={UserCreate} edit={UserEdit} icon={UserIcon}></Resource>
    </Admin >
  )
}

export default AdminPanel