import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AppNavbar from './components/AppNavbar.jsx';
import AllHealthCenters from './components/allHealthCenters.jsx';
import Animal_Case from './components/Animal_Case.jsx';
import Human_Case from './components/Human_Case.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import Admin from './components/Admin.jsx';
import LoginPageHealthCenter from './components/LoginPageHealthCenter.jsx';
import LoginPageAdmin from './components/LoginPageAdmin.jsx';
import Health_center from './components/Health_center.jsx';
import New_human_case from './components/New_human_case';
import New_animal_case from './components/New_animal_case';
var sectionStyle = {
  backgroundColor: '#DEE4E7',
  width: '100%',
  height: '100vh',
  overflowY: 'auto',
  overflowX: 'auto',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
};

function App() {
  return (
    <div style={sectionStyle}>
      <Router>
        <AppNavbar />
        <Switch>
          <Route path='/' exact component={LoginPageHealthCenter} />
          <Route path='/human_case' component={Human_Case} />
          <Route path='/animal_case' component={Animal_Case} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/loginPage' component={LoginPageHealthCenter} />
          <Route path='/loginPageAdmin' component={LoginPageAdmin} />
          <Route path='/health_center' component={Health_center} />
          <Route path='/new_humancase' component={New_human_case} />
          <Route path='/admin' component={Admin} />
          <Route path='/allhealthcenters' component={AllHealthCenters} />
          <Route path='/new_animalcase' component={New_animal_case} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
