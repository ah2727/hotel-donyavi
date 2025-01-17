// dashboard
import MainPage from "pages/Dashboards/MainPage";
import Arborist from "pages/Dashboards/Arborist";
import Persons from "pages/Dashboards/persons";
import Places from "pages/Dashboards/places";
import TechnicalWarehouse from "pages/Dashboards/Technicalwarehouse";
import DEquipment from "pages/Dashboards/DEquipment";
import Typeofchange from "pages/Dashboards/Typeofchange";
import TypeEquipment from "pages/Dashboards/TypeEquipment";
import TypeDevice from "pages/Dashboards/TypeDevice";
import Users from "pages/Dashboards/user/user";
// Create Password
import BasicCreatePassword from "pages/AuthenticationInner/CreatePassword/Basic";
import CreatePasswordModern from "pages/AuthenticationInner/CreatePassword/CreatePasswordModern";
import CreatePasswordCover from "pages/AuthenticationInner/CreatePassword/CreatePasswordCover";
import CreatePasswordBoxed from "pages/AuthenticationInner/CreatePassword/CreatePasswordBoxed";
import Login from "pages/Authentication/Login";
import Logout from "pages/Authentication/LogOut";
import Pages404 from "pages/AuthenticationInner/Pages404";
import Register from "pages/Authentication/Register";
import UserProfile from "pages/Authentication/UserProfile";
import Offline from "pages/AuthenticationInner/Offline";

interface RouteObject {
  path: string;
  component: React.ComponentType<any>; // Use React.ComponentType to specify the type of the component
  exact?: boolean;
}

const authProtectedRoutes: Array<RouteObject> = [
  // Dashboard
  { path: "/", component: MainPage },
  { path: "/dashboard", component: MainPage },
  { path: "/arborist", component: Arborist },
  { path: "/persons", component: Persons },
  { path: "/places", component: Places },
  { path: "/Technicalwarehouse", component: TechnicalWarehouse },
  { path: "/DEquipment", component: DEquipment },
  { path: "/Typeofchange", component: Typeofchange },
  { path: "/TypeEquipment", component: TypeEquipment },
  { path: "/TypeDevice", component: TypeDevice },
  { path: "/users", component: Users },

  // profile
  { path: "/user-profile", component: UserProfile },
];

const publicRoutes = [
  // Landing

  { path: "/auth-create-password-basic", component: BasicCreatePassword },
  { path: "/auth-create-password-cover", component: CreatePasswordCover },
  { path: "/auth-create-password-boxed", component: CreatePasswordBoxed },
  { path: "/auth-create-password-modern", component: CreatePasswordModern },

  // Error
  { path: "/pages-offline", component: Offline },
  { path: "/pages-404", component: Pages404 },

  // Maintenance

  // authentication
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/register", component: Register },
];

export { authProtectedRoutes, publicRoutes };
