import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import JobsPage from './components/JobsPage'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/" component={Home} />
    <Route exact path="/jobs" component={JobsPage} />
  </Switch>
)

export default App
