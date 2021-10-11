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
          <Route path="/" component={Register} exact={true}/>
          <Route path="/Register" component={Register} exact={true}/>
          <Route path="/Login" component={Login} exact={true}/>
          <Route path="/Todo" component={Todo} exact={true}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
