import { RouteObject } from 'react-router-dom';
import Dashboard from "../pages/admin/Dashboard";
import UserManagement from "../pages/admin/UserManagement";
import TourManagement from "../pages/admin/TourManagement";
import Profile from '../pages/user/Profile';
import Bookings from '../pages/user/Bookings';
import Settings from '../pages/user/Settings';
import Favorites from '../pages/main/Favorites';

const privateRoutes: RouteObject[] = [
    {
      path: '/admin/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/admin/users',
      element: <UserManagement />,
    },
    {
      path: '/admin/tours',
      element: <TourManagement />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/bookings',
      element: <Bookings />,
    },
    {
      path: '/settings',
      element: <Settings />,
    },
    {
      path: '/favorites',
      element: <Favorites />,
    },
  ];
  
  export default privateRoutes;