import {
    Admin,
    CustomRoutes,
    Resource,
    houseDarkTheme,
    houseLightTheme,
} from "react-admin";
import { QueryClient } from "react-query";
import { UserList } from "../components/User/UserList";
import { dataProvider } from "../contexts/dataProvider";
import { authProvider } from "../contexts/authProvider";
import LoginPage from "../components/Layout/LoginPage";
import { UserCreate } from "../components/User/UserCreate";
import { UserEdit } from "../components/User/UserEdit";
import { SegmentList } from "../components/Segment/SegmentList";
import { CategoryList } from "../components/Categories/CategoryList";
import { ProductList } from "../components/Product/ProductList";
import UserIcon from "@mui/icons-material/Group";
import { LayoutDefault } from "../components/Layout/LayoutDefault";
import CategoryEdit from "../components/Categories/CategoryEdit";
import ReviewList from "../components/Review/ReviewList";
import ReviewCreate from "../components/Review/ReviewCreate";
import ProductCreate from "../components/Product/ProductCreate";
import ProductEdit from "../components/Product/ProductEdit";
import Dashboard from "../components/Dashboard/Dashboard";
import { CategoryCreate } from "../components/Categories/CategoryCreate";
import { CouponList } from "../components/Coupon/CouponList";
import { CouponEdit } from "../components/Coupon/CouponEdit";
import { CouponCreate } from "../components/Coupon/CouponCreate";
import { SliderList } from "../components/Slider/SliderList";
import SliderEdit from "../components/Slider/SliderEdit";
import SliderCreate from "../components/Slider/SliderCreate";
import OrderList from "../components/Order/OrderList";
import OrderEdit from "../components/Order/OrderEdit";
import InvoiceList from "../components/Invoice/InvoiceList";
import ContactList from "../components/Contact/ContactList";
import ChatList from "../components/Chat/ChatList";
import { Route } from "react-router-dom";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            structuralSharing: false,
        },
        mutations: {
            retryDelay: 3000,
        },
    },
});

const AdminPanel = () => {
    return (
        <Admin
            queryClient={queryClient}
            layout={LayoutDefault}
            dataProvider={dataProvider}
            authProvider={authProvider}
            loginPage={LoginPage}
            lightTheme={houseLightTheme}
            darkTheme={houseDarkTheme}
            dashboard={Dashboard}
        >
            <Resource
                name="users"
                list={UserList}
                create={UserCreate}
                edit={UserEdit}
                icon={UserIcon}
            ></Resource>
            <Resource name="segments" list={SegmentList}></Resource>
            <Resource
                name="categories"
                list={CategoryList}
                edit={CategoryEdit}
                create={CategoryCreate}
            ></Resource>
            <Resource
                name="products"
                list={ProductList}
                create={ProductCreate}
                edit={ProductEdit}
            ></Resource>
            <Resource
                name="orders"
                list={OrderList}
                edit={OrderEdit}
            ></Resource>
            <Resource name="invoices" list={InvoiceList}></Resource>
            <Resource
                name="coupons"
                list={CouponList}
                edit={CouponEdit}
                create={CouponCreate}
            ></Resource>
            <Resource
                name="rates"
                list={ReviewList}
                create={ReviewCreate}
            ></Resource>
            <Resource name="contacts" list={ContactList}></Resource>
            <Resource
                name="sliders"
                list={SliderList}
                create={SliderCreate}
                edit={SliderEdit}
            ></Resource>
            <CustomRoutes>
                <Route
                    path="/converses/:conversationId"
                    element={<ChatList />}
                />
                <Route path="/converses" element={<ChatList />} />
            </CustomRoutes>
        </Admin>
    );
};

export default AdminPanel;
