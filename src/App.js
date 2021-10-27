import './App.css';
import './assets/sass/main.scss';
import './assets/client/css/LineIcons.3.0.css';
import './assets/client/scss/main.scss';
import { adminRoutes, clientRoutes } from './routes/route';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import LoginAdminComponent from './layouts/Admin/Login/LoginAdminComponent';
import LoginComponent from './layouts/Client/Login/LoginComponent';
import AdminTemplate from './layouts/Admin/AdminTemplate';
import ClientTemplate from './layouts/Client/ClientTemplate';
import PageErrors from './layouts/Pages/PageErrors';
import { useSelector } from 'react-redux';
import { ACCESS_TOKEN } from './settings/configUrl';

function App() {
  const user = useSelector(state => state.authReducer.currentUser);
  const isLogin = useSelector(state => state.authReducer.isLogin);
  const token = localStorage.getItem(ACCESS_TOKEN);
  const renderRoute = (route, Layout) => {
    return route.map((item, index) => {
      if (item.auth) {
        return token && isLogin ? <Layout exact path={item.path} component={item.component} key={index} /> : ''
      }
      return <Layout exact path={item.path} component={item.component} key={index} />
    });
  }
  const authenticated = () => {
    if (user.role == 2 && isLogin && token) return true;
    return false;
  }
  return (
    <Router>
      <Switch>
        {
          authenticated() ?
            renderRoute(adminRoutes, AdminTemplate) :
            ''
        }
        {
          renderRoute(clientRoutes, ClientTemplate)
        }
        <Route exact path="/admin" component={LoginAdminComponent} />
        <Route exact path="" component={PageErrors} />
      </Switch>
    </Router>
  );
}

export default App;
