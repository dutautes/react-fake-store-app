import CardComp from "./CardComp";
import CardCommerce from "./CardCommerce";
import { useState, useContext } from 'react';
import ModalCartComp from './ModalCartComp';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function CardList({data, type, children}) {
    const [openModal, setOpenModal] = useState(false);
    const [selected, setSelected] = useState({});
    const { addToCart } = useContext(CartContext);

    function updateSelected(item) {
        setSelected(item);
        setOpenModal(true);
    }

    function handleClose() {
        setOpenModal(false);
    }
    
    const navigate = useNavigate();
    const { isLogin } = useContext(AuthContext);

    function handleBtnKeranjang(product, qty) {
        // jika isLogin dari AuthContext nya false, arahkan ke halaman login
        if (!isLogin) {
            navigate("/login");
        }
        addToCart(product, qty);
        setOpenModal(false);
    }
    
    return (
    <>
    <div className="block mx-auto w-5xl mt-4">
        {children}
        <div className='grid grid-cols-4 gap-4'>
            {
                data.map((item, index) => type == "category" ? (<CardComp key={index} item={item} />) : (<CardCommerce key={index} item={item} updateSelected={updateSelected} />))
            }
        </div>
    </div>
    <ModalCartComp item={selected} handleClose={handleClose} openModal={openModal} handleBtnKeranjang={handleBtnKeranjang} />
    </>
    )
}