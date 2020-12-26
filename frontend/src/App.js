import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import {NavBar} from './cmps/NavBar'
import {Home} from './pages/Home'
import {StudentDetails} from './pages/StudentDetails'


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Switch>
          <Route component={StudentDetails} path='/:_id' />
          <Route component={Home} path='/' />
        </Switch>
      </Router>
        {/* <Footer/> */}
    </div>
  )
}

export default App;
