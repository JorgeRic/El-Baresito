import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import CreateActuaciones from './pages/CreateActuaciones';
import UpdateActuacion from './pages/UpdateActuacion';
import Presentacion from './pages/Presentacion';
import Almacen from './pages/Almacen';
import Ventas from './pages/Ventas';
import Productos from './pages/Productos';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/createActuaciones' exact component={CreateActuaciones} />
          <Route path='/actuaciones/updateActuacion/:id' exact component={UpdateActuacion} />
          <Route path='/presentacion' exact component={Presentacion} />
          <Route path='/almacen' exact component={Almacen} />
          <Route path='/ventas' exact component={Ventas} />
          <Route path='/productos' exact component={Productos} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
