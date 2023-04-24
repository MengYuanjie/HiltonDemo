import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import SnackbarProvider from 'react-simple-snackbar'
import Home from './components/Home/Home';
import Reservation from './components/Reservation/Reservation';
import Reservations from './components/Reservations/Reservations';
import ReservationDetails from './components/ReservationDetails/ReservationDetails'
import ClientList from './components/Clients/ClientList'
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Forgot from './components/Password/Forgot'
import Reset from './components/Password/Reset'

function App() {

  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <div>
      <BrowserRouter>
        <SnackbarProvider>
          {user && <NavBar />}
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/reservation" exact component={Reservation} />
            <Route path="/edit/reservation/:id" exact component={Reservation} />
            <Route path="/reservation/:id" exact component={ReservationDetails} />
            <Route path="/reservations" exact component={Reservations} />
            <Route path="/login" exact component={Login} />
            <Route path="/customers" exact component={ClientList} />
            <Route path="/forgot" exact component={Forgot} />
            <Route path="/reset/:token" exact component={Reset} />
            <Redirect exact from="/new-reservation" to="/reservation" />
          </Switch>
          <Footer />
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
