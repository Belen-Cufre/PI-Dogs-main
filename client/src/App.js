import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from './components/landingPage/landing/Landing';
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
import Form from "./components/form/Form";
import NavBar from "./components/navBar/NavBar";
import Jwthf from './components/jwthf/JustWatchThemHaveFun';




function App() {
  let location= useLocation()
  return (
    <div className={location.pathname === "/" && "Landing"}>
      {location.pathname !== "/" && <NavBar/>}
      <Routes>
        <Route exact path= "/" element={<Landing/>} />
        <Route exact path= "/home" element={<Home/>} />
        <Route exact path= "/detail/:id" element={<Detail/>} />
        <Route exact path= "/createDogs" element={<Form/>} />
        <Route exact path= "/funnyDogs" element={<Jwthf/>}/>
      </Routes>
    </div>
  );
}

export default App;
