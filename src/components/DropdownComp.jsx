import { Dropdown, DropdownItem } from "flowbite-react";

export default function DDownComp({ processSort }) {
  return (
    <Dropdown color="alternative" label="Urutkan Data" dismissOnClick={false}>
      <DropdownItem onClick={() => processSort("harga termurah")}>
        Harga Termurah
      </DropdownItem>
      <DropdownItem onClick={() => processSort("harga termahal")}>
        Harga Termahal
      </DropdownItem>
      <DropdownItem onClick={() => processSort("alfabet menurun")}>
        Alfabet Menurun
      </DropdownItem>
      <DropdownItem onClick={() => processSort("alfabet menaik")}>
        Alfabet Menaik
      </DropdownItem>
    </Dropdown>
  );
}