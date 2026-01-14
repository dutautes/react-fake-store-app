import {
  Navbar,
  NavbarBrand,
} from "flowbite-react";
import { FcPaid } from "react-icons/fc";
import imageLogo from "../assets/logo.webp";

export default function NavbarComp() {
    return (
        <Navbar fluid rounded className="px-10 py-5">
      <NavbarBrand href="https://flowbite-react.com">
        <img src={imageLogo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">FAKE STORE APP</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <FcPaid className="text-3xl"/>
      </div>
    </Navbar>
    )
}