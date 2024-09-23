import './main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Controle from './screens/Controle.jsx';
import Planning from './screens/Planning.jsx';
import QualityControlForm from './screens/report.jsx';
import UserSearchAndAssignScreen from './screens/UserSearchAndAssignScreen.jsx';
import PlanningCalendar from './screens/PlanningCalendar.jsx';
import CreateCollab from './screens/CreateCollabScreen.jsx';
import CollabListScreen from './screens/CollabListScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/controle' element={<Controle />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/collab' element={<CreateCollab />} />
      <Route path='/collab-list' element={<CollabListScreen />} />
      <Route path='/calendar' element={<PlanningCalendar />} />
      <Route path='/user' element={<UserSearchAndAssignScreen />} />
      <Route path='/report' element={<QualityControlForm />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
