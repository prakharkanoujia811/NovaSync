import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import GroupPage from './pages/GroupPage.jsx';
import AddExpense from './pages/AddExpense.jsx';
import Navbar from "./components/Navbar.jsx";
import ProtectedRoutes from "./hooks/ProtectedRoutes.js";

const App = () =>{
  return (
    <div>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>} />
        <Route path='/group' element={<ProtectedRoutes><GroupPage/></ProtectedRoutes>} />
        <Route path='/add-expense' element={<ProtectedRoutes><AddExpense/></ProtectedRoutes>} />
        <Route path='/add-expense/:id' element={<ProtectedRoutes><AddExpense></AddExpense></ProtectedRoutes>}/>
      </Routes>
    </div>
  );
}
export default App;