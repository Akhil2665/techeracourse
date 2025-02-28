import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import CourseDetails from './components/CourseDetails'
import NotFound from './components/NotFound'
import Header from './components/Header'

import './App.css'

// Replace your code here

const App = () => (
  <>
    <div className="app-container">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/courses/:id" component={CourseDetails} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </div>
  </>
)

export default App
