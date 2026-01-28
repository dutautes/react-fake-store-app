import { TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";

export default function SearchComp({ processSearch }) {
  return (
    <TextInput
      className="w-2xl"
      type="text"
      icon={CiSearch}
      placeholder="Cari Nama Folder"
      required
      onKeyUp={processSearch}
    />
    );
}