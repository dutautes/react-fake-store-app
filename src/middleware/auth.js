import { redirect } from "react-router-dom";

export function auth() {
  let access_token = localStorage.getItem("access_token");

  // jika tidak ada access_token di localStorage
  if (!access_token) {
    // navigate() -> untuk fungsi yg menangani event
    // redirect() -> untuk fungsi biasa (bukan penanganan event), digunakan dengan return
    return redirect("/login");
  }

  // jika ada access_token dilanjutkan prosesnya
  return null;
}
