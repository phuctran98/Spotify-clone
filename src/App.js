import './App.css';
import Hero from './components/Hero';
import NavigationBar from './components/NavigationBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import WebApp from './page/WebApp';
import { useAuth } from './Context/AuthContext';
import SpotifyApp from './page/SpotifyApp';


function App() {
  const { isLoading } = useAuth()
  return (
    isLoading ? <h1>hold on, few second</h1> : (
      <Router>
        {/* <NavigationBar></NavigationBar> */}
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <PrivateRoute path='/webapp'>
            <WebApp />
          </PrivateRoute>
          {/* <PrivateRoute path="/" exact>
            <SpotifyApp></SpotifyApp>
          </PrivateRoute> */}
          <Route path="/"exact >
            <LoginForm></LoginForm>
          </Route>
          <Route path="/spotify">
            <SpotifyApp></SpotifyApp>
          </Route>
        </Switch>

      </Router>
    )
  );
}

export default App;
