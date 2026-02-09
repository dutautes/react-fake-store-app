import { Card } from "flowbite-react";
import { ButtonGroup, Button } from 'flowbite-react';
import { useContext } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";

export default function CardListHorizontal({ data }) {
    const {changeQty, deleteAll, deleteItem} = useContext(CartContext);
    return (
    <Card className="block mx-auto my-25 w-4xl">
        <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Keranjang</h5>
            <p href="#" className="text-sm font-medium text-red-600 hover:underline dark:text-red-500" onClick={deleteAll} style={{cursor: "pointer"}}>
            Hapus Semua
            </p>
        </div>
        <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {
                    data.map((item, index) => (
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4">
                            <div className="shrink-0">
                                <img
                                alt={item.title}
                                height="32"
                                src={item.image}
                                width="50"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400 font-bold">X{item.qty}</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">${item.price}</div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <ButtonGroup>
                                    <Button color="blue" className="px-3 py-0" onClick={() => changeQty(item.id, "-")}> 
                                        <FaMinus className="w-3 h-3" />
                                    </Button>
                                    <Button color="alternative" className="px-3 py-0"> {item.qty}</Button>
                                    <Button color="blue" className="px-3 py-0" onClick={() => changeQty(item.id, "+")}> 
                                        <FaPlus className="w-3 h-3" />
                                    </Button>
                                </ButtonGroup>
                                <FaTrash className="text-4xl ms-2 text-red-500" onClick={() => deleteItem(item.id)}/>
                            </div>
                        </li>
                    ))
                }
            
            </ul>
        </div>
    </Card>
  );
}