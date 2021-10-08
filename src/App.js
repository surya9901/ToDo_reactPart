import Todo from './Components/Todo/Todo';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route path="/Todo">
            <Todo />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
