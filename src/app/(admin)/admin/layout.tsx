'use client'
import { Inter } from "next/font/google";
import "../../globals.css";
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import Image from "next/image";
import MenuAdmin from "../components/menuAdmin/MenuAdmin";
import FooterAdmin from "../components/FooterAdmin/FooterAdmin";
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });



export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastContainer />
        <Provider store={store}>

          <HeaderAdmin></HeaderAdmin>
          <div className="flex overflow-hidden bg-white pt-16">
            <MenuAdmin></MenuAdmin>
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
            <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">

              {children}

              <FooterAdmin></FooterAdmin>
            </div>
          </div>
        </Provider>


      </body>
    </html>
  );
}
