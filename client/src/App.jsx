import './App.css'
import { Routes, Route } from "react-router-dom"
import Home from "./routes/Home"
import Login from "./routes/Login";
import Layout from "./Layout";
import Register from './routes/Register';
import axios from 'axios';
import { UserContextProvider } from './userContext';
import ProfilePage from './routes/ProfilePage';
import PlacesPage from './routes/PlacesPage';
import PlacesFromPage from './routes/placesFromPage';
import PlacePage from './routes/placePage';
import BookingsPage from './routes/BookingsPage';
import BookingPage from './routes/BookingPage';

axios.defaults.baseURL = 'http://127.0.0.1:4000'
axios.defaults.withCredentials = true;

function App() {
  return (
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={ <Home /> } />
            <Route path="/Login" element={ <Login/> } />
            <Route path="/Register" element={ <Register/> } />        
            <Route path="/account" element={<ProfilePage/>}/>
            <Route path="/account/places" element={<PlacesPage/>}/>
            <Route path="/account/places/new" element={<PlacesFromPage/>}/>
            <Route path="/account/places/:id" element={<PlacesFromPage/>}/>
            <Route path="/places/:id" element={<PlacePage/>}/>
            <Route path="/account/bookings" element={<BookingsPage/>}/>
            <Route path="/account/booking/:id" element={<BookingPage/>}/>


          </Route>
        </Routes>
      </UserContextProvider>

  )
}

export default App