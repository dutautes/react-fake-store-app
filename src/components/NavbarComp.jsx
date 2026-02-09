import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader, 
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarToggle,
  Button
} from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { FcPaid } from "react-icons/fc";
import imageLogo from "../assets/logo.webp";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from "../contexts/CartContext";

export default function NavbarComp() {
  // menggunakan context
  const { isLogin, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  function handleLogout() {
    // panggil func logout dari context
    logout();
    // pindahkan halaman, navigate tidak bisa digunakan di context
    navigate("/");
  }

  async function getUsers() {
    const url = "https://api.escuelajs.co/api/v1/users/1";
            try {
              const response = await fetch(url);
              if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
              }
        
              const result = await response.json();
              setUsers(result);
            } catch (error) {
               console.error(error.message);
            }
          }
        
          useEffect(() => {
            getUsers();
          }, []);
        
          const {cart} = useContext(CartContext);  

    return (
         <Navbar fluid rounded className="py-4">
      <Link to="/">
      <NavbarBrand>
        <img src={imageLogo} className="mr-3 h-6 sm:h-9" alt="Fake Store React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">FAKE STORE APP</span>
      </NavbarBrand>
      </Link>
      <div className="flex md:order-2 gap-2">
        <Link to="/cart" style={{position: "relative"}}>
        <span className="bg-red-200 text-red-500 px-2 rounded-full" style={{position: "absolute", right: "20px", bottom: "20px"}}>{cart.length}</span>
          <FcPaid className="text-4xl mt-2"/>
        </Link>
        {
          isLogin && (<Button color="red" className="ms-3" onClick={handleLogout}>Logout</Button>)
        }
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar className="cursor-pointer" alt="User settings" img={users.avatar} rounded />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{users.name}</span>
            <span className="block truncate text-sm font-medium">{users.email}</span>
          </DropdownHeader>
          <Link to="/users">
          <DropdownItem>Profile</DropdownItem>
          </Link>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
    </Navbar>
    )
}