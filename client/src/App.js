import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './components/landingPage/landing/Landing';
import Home from "./components/home/Home";
import Detail from "./components/detail/Detail";
import Form from "./components/form/Form";
import NavBar from "./components/navBar/NavBar";
import SearchBar from './components/home/searchBar/Search';



function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route exact path= "/" element={<Landing/>} />
        <Route exact path= "/home" element={<Home/>} />
        <Route exact path= "/detail" element={<Detail/>} />
        <Route exact path= "/form" element={<Form/>} />
      </Routes>
    </div>
  );
}

export default App;
