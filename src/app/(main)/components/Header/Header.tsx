"use client";
import Link from "next/link";
import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import Image from "next/image";
import NavItems from "./NavItems";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { ThemeSwitcher } from "@/app/utills/ThemeSwitcher";
import { useTheme } from "next-themes";
import CustomModal from "@/app/utills/CustomModal";
import { useSelector } from 'react-redux';
import SignUp from "../Auth/SignUp";
import Login from "../Auth/Login";


type Props = {};

const Header: React.FC<Props> = () => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  
  const user = useSelector((state:any) => state.auth.user);
  
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <>
      <div className="mb-[90px]"></div>
      <div className="fixed w-full  z-[80] top-0 bg-white dark:bg-gradient-to-b shadow-xl dark:bg-black dark:border-[#ffffff1c] h-[95px] dark:shadow dark:from-gray-900">
        <div>
          <div className="w-[95%] md:w-[92%] m-auto py-2 h-full">
            <div className="w-full h-[80px] flex items-center justify-between">
              <div>
                <Link
                  href={"/"}
                  className={`flex text-[25px] font-[500] text-black dark:text-white`}
                >
                  <Image
                    className=""
                    width={50}
                    height={50}
                    src={
                      theme === "dark"
                        ? "/image/logo/2.png"
                        : "/image/logo/1.png"
                    }
                    alt=""
                  />

                  <span className="self-center text-black text-xl font-semibold whitespace-nowrap dark:text-white">
                    ForToNight
                  </span>

                </Link>
              </div>
              <div className="flex items-center ">
                <NavItems activeItem={activeItem} isMobile={false} isOpenSidebar={openSidebar} />
                <ThemeSwitcher />

                <div className="block lg:hidden ">
                  <HiOutlineMenuAlt3
                    size={25}
                    className="cursor-pointer text-black dark:text-white"
                    onClick={() => setOpenSidebar(true)}
                  />
                </div>
                {user ? (
                  <Link href={"/profile"}>
                    <Image
                      src={user.avatar ? user.avatar : "/image/avatar.png"}
                      alt="avatar"
                      className="w-[30px] h-[30px] rounded-full cursor-pointer"
                      width={30}
                      height={30}
                    />
                  </Link>
                ) : (
                  <HiOutlineUserCircle
                    size={25}
                    className=" cursor-pointer dark:text-white text-black mr-4"
                    onClick={() => setOpen(true)}
                  />
                )}
              </div>
            </div>
            {openSidebar && (
              <div className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]" onClick={handleClose} id="screen">
                <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 ">
                  <NavItems
                    activeItem={activeItem}
                    isMobile={true}
                    isOpenSidebar={openSidebar}
                  />
                  <HiOutlineUserCircle
                    size={25}
                    className="cursor-pointe ml-5 my-2r dark:text-white text-black"
                    onClick={() => setOpen(true)}
                  />
                  <br />
                  <br />
                  <p className="text-[16px] px-2 pl-5 text-black dark:text-white">Copyright @ 2024</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
      {
        route === "Login" && (
          <>
            <CustomModal
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              component={Login}
              setRoute={setRoute}
            />

          </>
        )
      }
      {
        route === "Sign-Up" && (
          <>
            <CustomModal
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              component={SignUp}
              setRoute={setRoute}
            />

          </>
        )
      }
    </>
  );
};
export default Header;
