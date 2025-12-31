import React, { useState } from 'react';
import { Sparkles, LogIn, House, LayoutDashboard, Users, ReceiptIndianRupee, LogOut, UserPlus, X, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Navbar.css'

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogin = (path) => {
        if(!user)
        {
            navigate('/login');
        }
        else
        {
            navigate(path);
        }
        setMenuOpen(false);
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
        setMenuOpen(false);
    };

    return (
        <nav className='navbar'>
            <Link to='/' className='nav-logo'>
                <h2 className='nva'><div className='icon'><Sparkles size={26}/></div>NovaSync</h2>
            </Link>

            <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={26}/>: <Menu size={26}/>}
            </div>

            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                <Link to='/' className='nav-item' onClick={() => setMenuOpen(false)}>
                    <House size={15}/> Home
                </Link>

                <div className='nav-item nav-clickable' onClick={() => handleLogin('/dashboard')}>
                    <LayoutDashboard size={15}/> Dashboard
                </div>

                <div className='nav-item nav-clickable' onClick={() => handleLogin('/group')}>
                    <Users size={15}/> Groups
                </div>

                <div className='nav-item nav-clickable' onClick={() => handleLogin('/add-expense')}>
                    <ReceiptIndianRupee size={15}/> Expenses
                </div>


                {
                    !user ? (
                        <>
                         <Link to='/login' className='nav-item' onClick={() => setMenuOpen(false)}>
                            <LogIn size={15}/> Login
                         </Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className='nav-item nav-button'>
                            <LogOut size={15}/> Logout
                        </button>
                    )
                }
            </div>
        </nav>
    );
};

export default Navbar;
