import Dashboard from '../Dashboard';

import AddBuilding from '../funtions/Building/AddBuilding';
let routes = [

  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/building/add",
    name: "ADD_BUILDING",
    component: AddBuilding,
    exact: true,
  }

];

export default routes;
