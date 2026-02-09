import { createContext, useState } from "react";

// membuat context
export const AuthContext = createContext();

// menyimpan proses yang akan dibuat global (bisa diakses di file mana aja)
export default function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(localStorage.getItem("access_token"));

    function logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsLogin(false);
    }

    function login() {
        // ubah state isLogin jadi data localstorage, untuk trigger munculnya btn logout di navbar
        setIsLogin(localStorage.getItem("access_token"));
    }

    // mendefinisikan context akan digunakan di pages apa saja
    return (
        // value : data/function yang diperbolehkan diakses global
        <AuthContext.Provider value={{isLogin, logout, login}}>
            {/* kalo gapake children, perlu manggil satu satu file pages, kalo mau berlaku di semuanya gunakanprops children */}
            {children}
        </AuthContext.Provider>
    )
}