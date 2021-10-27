// Admin
import DashboardComponent from "../layouts/Admin/Dashboard/DashboardComponent";
import CategoriesComponent from '../layouts/Admin/Categories/CategoriesComponent';
import UserComponent from '../layouts/Admin/User/UserComponent';
import ProductComponent from '../layouts/Admin/Product/ProductComponent';
import CreateProduct from '../layouts/Admin/Product/Modals/Product/CreateProduct';
import EditProduct from '../layouts/Admin/Product/Modals/Product/EditProduct';
import CreateVariant from '../layouts/Admin/Product/Modals/Variant/CreateVariant';
import EditVariant from '../layouts/Admin/Product/Modals/Variant/EditVariant';
import ProductVariant from '../layouts/Admin/ProductVariant/ProductVariant';
import OrderComponent from '../layouts/Admin/Order/OrderComponent';
import OrderDetailComponent from '../layouts/Admin/OrderDetails/OrderDetailComponent';
import AnalyticsComponent from '../layouts/Admin/Analytics/AnalyticsComponent';
import DiscountComponent from '../layouts/Admin/Discount/DiscountComponent';
import PostComponent from '../layouts/Admin/Post/PostComponent';
import ReviewComponent from '../layouts/Admin/Review/ReviewComponent';
import InventoryManagement from '../layouts/Admin/Inventory/InventoryManagement';
import SettingComponent from '../layouts/Admin/Settings/SettingComponent';
// Client
import HomeComponent from '../layouts/Client/Home/HomeComponent';
import LoginComponent from '../layouts/Client/Login/LoginComponent';
import RegisterComponent from '../layouts/Client/Register/RegisterComponent';
import ProductDetail from '../layouts/Client/Detail/ProductDetail';
import MainProduct from '../layouts/Client/Products/MainProduct';
import MainCategories from '../layouts/Client/Categories/MainCategories';
import MainCart from '../layouts/Client/Cart/MainCart';
import MainCheckout from "../layouts/Client/Checkout/MainCheckout";
import MainAccount from '../layouts/Client/Account/MainAccount';


export const adminRoutes = [
    {
        path: '/admin/dashboard',
        component: DashboardComponent,
        exact: true
    },
    {
        path: '/admin/categories',
        component: CategoriesComponent,
        exact: true
    },
    {
        path: '/admin/categories',
        component: CategoriesComponent,
        exact: true
    },
    {
        path: '/admin/product',
        component: ProductComponent,
        exact: true
    },
    {
        path: '/admin/product/create',
        component: CreateProduct,
        exact: true
    },
    {
        path: '/admin/product/edit/:id',
        component: EditProduct,
        exact: true
    },
    {
        path: '/admin/product/:id/variant/create',
        component: CreateVariant,
        exact: true
    },
    {
        path: '/admin/product/variant/:id/edit',
        component: EditVariant,
        exact: true
    },
    {
        path: '/admin/product/variant/:id/sku',
        component: ProductVariant,
        exact: true
    },
    {
        path: '/admin/inventory',
        component: InventoryManagement,
        exact: true
    },
    {
        path: '/admin/post',
        component: PostComponent,
        exact: true
    },
    {
        path: '/admin/user',
        component: UserComponent,
        exact: true
    },
    {
        path: '/admin/review',
        component: ReviewComponent,
        exact: true
    },
    {
        path: '/admin/order',
        component: OrderComponent,
        exact: true
    },
    {
        path: '/admin/order/detail',
        component: OrderDetailComponent,
        exact: true
    },
    {
        path: '/admin/analytics',
        component: AnalyticsComponent,
        exact: true
    },
    {
        path: '/admin/discount',
        component: DiscountComponent,
        exact: true
    },
    {
        path: '/admin/setting',
        component: SettingComponent,
        exact: true
    }
];

export const clientRoutes = [
    {
        path: '/',
        component: HomeComponent,
        exact: true
    },
    {
        path: '/login',
        component: LoginComponent,
        exact: true
    },
    {
        path: '/register',
        component: RegisterComponent,
        exact: true
    },
    {
        path: '/detail/:slug',
        component: ProductDetail,
        exact: true
    },
    {
        path: '/product/:slug',
        component: MainProduct,
        exact: true
    },
    {
        path: '/categories',
        component: MainCategories,
        exact: true
    },
    {
        path: '/cart',
        component: MainCart,
        exact: true
    },
    {
        path: '/checkout',
        component: MainCheckout,
        exact: true
    },
    {
        path: '/purchase',
        component: MainAccount,
        exact: true,
        auth: true
    },
    {
        path: '/account/profile',
        component: MainAccount,
        exact: true,
        auth: true
    },
    {
        path: '/account/password',
        component: MainAccount,
        exact: true,
        auth: true
    }
]

export const protectedClientRoutes = [
    // {
    //     path: '/purchase',
    //     component: MainAccount,
    //     exact: true
    // },
    // {
    //     path: '/account/profile',
    //     component: MainAccount,
    //     exact: true
    // },
    // {
    //     path: '/account/password',
    //     component: MainAccount,
    //     exact: true
    // }
]