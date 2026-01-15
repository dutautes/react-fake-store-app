import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link } from 'react-router-dom';
import { FcPaid } from "react-icons/fc";
import imageLogo from "../assets/logo.webp";
import { useState, useEffect } from 'react';

export default function NavbarComp() {
  const [users, setUsers] = useState([]);


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

    return (
         <Navbar fluid rounded className="py-4">
      <Link to="/">
      <NavbarBrand>
        <img src={imageLogo} className="mr-3 h-6 sm:h-9" alt="Fake Store React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">FAKE STORE APP</span>
      </NavbarBrand>
      </Link>
      <div className="flex md:order-2 gap-2">
        <FcPaid className="text-3xl"/>
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
      <NavbarCollapse>
        <Link to="/">
          <NavbarLink href="#" active>Home</NavbarLink>
        </Link>
        <NavbarLink href="#">About</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
    )
}