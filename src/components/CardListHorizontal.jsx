import { ButtonGroup, Button, Card } from 'flowbite-react';
import { useContext } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";


export default function CardListHorizontal({ data, isCheckoutPage = false}) {
    const {changeQty, deleteAll, deleteItem} = useContext(CartContext);
    const navigate = useNavigate();
    // hitung cekout barang
    const totalHargaProduk = data.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const biayaAplikasi = totalHargaProduk * 0.11; // ppn 11%
    const totalBayar = totalHargaProduk + biayaAplikasi; 

    const handleCompletePayment = () => {
        deleteAll();
        // Kirim state 'openModal' ke halaman tujuan
        navigate("/", { state: { openModal: true } });
    }

    function CheckoutPage() {
        navigate("/checkout");
    }

    return (
    <Card className="block mx-auto my-25 w-4xl">
        <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{isCheckoutPage ? "Checkout" : "Keranjang"}</h5>
            {!isCheckoutPage && data.length > 0 && (
                <p href="#" className="text-sm font-medium text-red-600 hover:underline dark:text-red-500" onClick={deleteAll} style={{cursor: "pointer"}}>
                    Hapus Semua
                </p>
            )}
        </div>
        <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {
                    data.map((item) => (
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
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">${item.price * item.qty}</div>
                            </div>
                            {!isCheckoutPage && (
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
                                    <FaTrash className="text-3xl ms-2 text-red-500" onClick={() => deleteItem(item.id)}/>
                                </div>
                            )}        
                        </li>
                    )) 
                }
            </ul>
            {data.length > 0 && (
                <div className="mt-8">
                    {isCheckoutPage ? (
                        <>
                            <h6 className="text-lg font-bold text-slate-900 mb-4">Detail Pembayaran</h6>
                            <div className="space-y-2 text-sm text-gray-500">
                                <div className="flex justify-between">
                                    <span>Total Harga Produk</span>
                                    <span className="font-bold text-slate-800">${totalHargaProduk}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Biaya Aplikasi</span>
                                    <span className="font-bold text-slate-800">${biayaAplikasi}</span>
                                </div>
                                <div className="flex justify-between border-t pt-2 text-slate-900">
                                    <span className="font-bold">Total Harga Bayar</span>
                                    <span className="font-extrabold text-blue-600">${totalBayar.toFixed(2)}</span> {/* toFixed(2) : buat buletin hasil nya (2) itu 2 angka setelat titik*/}
                                </div>
                            </div>
                            <div className="flex justify-end mt-8">
                                <Button color="blue" className="px-6" size="md" onClick={handleCompletePayment}>
                                    Selesaikan Pembayaran
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-end pt-3 mt-3 border-t border-gray-100">
                            <Button color="green" size="lg" onClick={CheckoutPage}>
                                Checkout
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    </Card>
  );
}