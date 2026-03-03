import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({children}) {
    const [cart, setCart] = useState([]);


    
    function addToCart(product, qty) {
        setCart((prev) => {
            const exist = prev.find((item) => item.id === product.id);

            if (exist) {
                return prev.map((item) => {
                    if (item.id === product.id) {
                        return { ...item, qty: item.qty + qty };
                    } else {
                        return item;
                    }
                });
            } else {
                return [
                    ...prev,
                    {
                        id: product.id,
                        title: product.title,
                        image: product.images ? product.images[0] : '',
                        price: product.price,
                        qty: qty,
                    },
                ]; 
            }
        }); 
    } 

    // useEffect(() => {
    //     console.log(cart)
    // }, [cart]);

    function changeQty(productId, type) {
        setCart((prev) => {
            // loop data cart, cari data id yang sesuai, update qty nya 
            return prev.map((item) => {
                // jika id yang lagi di loop sama dengan productId yg dicari
                if(item.id == productId) {
                    // jika tipe perubahannya +
                    if(type == "+") {
                        return {...item, qty: item.qty + 1}
                    } else {
                        // jika tipe perubahannya -, diupdate maks diangka 1 kurangnya
                        if(item.qty > 1) {
                            return {...item, qty: item.qty -1}
                        } else {
                            return item;
                        }
                    }
                } else {
                    return item; // jika id loop bukan productId diminta, tidak diubah
                }
            });
        })
    }

    function deleteAll() {
        setCart([]);
    }

    function deleteItem(productId) {
        setCart((prev) => {
            // ambil item yang id nya selain yg diminta, hilangkan yg diminta
            return prev.filter((item) => item.id != productId);
        })
    }

    return (
        <CartContext.Provider value={{cart, addToCart, changeQty, deleteAll, deleteItem }}>
            {children}
        </CartContext.Provider>
    ) 
}