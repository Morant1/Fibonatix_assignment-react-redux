import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import {Home} from './pages/Home'
// import {NavBar} from './cmps/NavBar'


function App() {
  return (
    <div className="App">
      <Router>
        {/* <NavBar/> */}
        <Switch>
          <Route component={Home} path='/' />
        </Switch>
      </Router>
        {/* <Footer/> */}
    </div>
  );
}

export default App;
