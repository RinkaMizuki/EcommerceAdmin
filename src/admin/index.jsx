import { Admin, Resource, useStore } from "react-admin"
import { UserList } from "../components/User/UserList"
import { dataProvider } from "../contexts/dataProvider"
import { authProvider } from "../contexts/authProvider"
import LoginPage from "../pages/LoginPage";
import { UserCreate } from "../components/User/UserCreate";
import { UserEdit } from "../components/User/UserEdit";
import { UserDetail } from "../components/User/UserDetail";
import { SegmentList } from "../components/Segment/SegmentList";
import { CategoryList } from "../components/Categories/CategoryList";
import { ProductList } from "../components/Product/ProductList";
import UserIcon from "@mui/icons-material/Group";
import { LayoutDefault } from "../components/Layout/LayoutDefault";
import CategoryEdit from "../components/Categories/CategoryEdit";
import ReviewList from "../components/Review/ReviewList";
import ReviewCreate from "../components/Review/ReviewCreate";
import { themes } from "../themes/themes";


const AdminPanel = () => {

  const [themeName] = useStore('themeName', 'soft');
  const lightTheme = themes.find(theme => theme.name === themeName)?.light;
  const darkTheme = themes.find(theme => theme.name === themeName)?.dark;

  return (
    <Admin
      layout={LayoutDefault}
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      lightTheme={lightTheme}
      // darkTheme={darkTheme}
    >
      <Resource
        name="users"
        list={UserList}
        show={UserDetail}
        create={UserCreate}
        edit={UserEdit}
        icon={UserIcon}
      ></Resource>
      <Resource
        name="segments"
        list={SegmentList}
      ></Resource>
      <Resource
        name="categories"
        list={CategoryList}
        edit={CategoryEdit}
      ></Resource>
      <Resource
        name="products"
        list={ProductList}
      ></Resource>
      <Resource
        name="rates"
        list={ReviewList}
        create={ReviewCreate}
      ></Resource>
    </Admin >
  )
}

export default AdminPanel