import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useState, useContext } from 'react';
import ToastFailed from "../components/ToastFailed";
import { Spinner } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function submitForm() {
        if (form.email == "" || form.password == "") {
            setError("Gagal! pastikan email dan password terisi.");
            console.log(error);
        } else {
            setLoading(true);
            processLogin();
        }
    }


    async function processLogin() {
        const url = "https://api.escuelajs.co/api/v1/auth/login";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            const result = await response.json();
            // kalau response nya gaada access_token, berarti gagal login
            if (!result.access_token) {
                throw new Error('Email dan password tidak sesuai');
            }

            // simpen token dari BE ke localStorage
            localStorage.setItem("access_token", result.access_token);
            localStorage.setItem("refresh_token", result.refresh_token);
            setError("");
            // func context untuk update isLogin
            login();
            // pindahkan ke halaman keranjang
            // <Link> pindah melalui HTML, useNavigate pindah melalui JS
            navigate("/cart")
        } catch (error) {
            setError("Gagal Login! pastikan email dan password sesuai.");
        } finally {
            setLoading(false);
        }
    }

    // ketika baru masuk ke login, cek jika ada access_token arahkan ke /cart
    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            navigate("/cart");
        }
    }, []);

    return (
        <>
        {
            error != "" && (<ToastFailed error={error} />)
        }
        <div className="w-100 block mx-auto mt-20">
            <h1 className="text-2xl mb-5 text-center">LOGIN</h1>
            <form className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="email1">Your email</Label>
                    </div>
                    <TextInput 
                    id="email1" 
                    type="email" 
                    placeholder="duta@gmail.com" 
                    required
                    // mengubah nilai dari state form bagian email sesuai value input ketika mengetikan data 
                    onKeyUp={(e) => setForm({...form, email: e.target.value})}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="password1">Your password</Label>
                    </div>
                    <TextInput 
                    id="password1" 
                    type="password" 
                    required
                    onKeyUp={(e) => setForm({...form, password: e.target.value})} />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                {
                    loading ? (
                    <Button disabled color="alternative">
                        <Spinner/> Sedang memproses
                    </Button>) : (
                    <Button type="button" onClick={submitForm}>
                        Login
                    </Button>) 
                }                {/* menggunakan button agar pake onclick dan tidak menggunakan submit menghindari reload page */}
            </form>
        </div>
        </>
    );
}