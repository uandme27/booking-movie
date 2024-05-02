import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
export const navItems = [
  {
    label: "Lịch Chiếu",
    dropdown: true,
    link: "/lichchieu",
  },
  {
    label: "Phim Chiếu",
    dropdown: true,
    link: "/phimchieu",
  },
  {
    label: "Khuyến mãi/ưu đãi",
    link: "/khuyenmai-uudai",
  },
  {
    label: "Blog",
    link: "/blog-phim",
  },
  {
    label: "About",
    link: "/about",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
  isOpenSidebar: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile, isOpenSidebar }) => {

  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className="hidden lg:flex">
        {navItems &&
          navItems.map((i, index) => (
            <Link href={`${i.link}`} key={index} passHref>
              <span
                className={`${activeItem === index
                  ? "dark:text-[#37a39a] text-[crimson]"
                  : "dark:text-white text-black"
                  } text-[13px]  px-6 font-[700]`}
              >
                {i.label}
              </span>
            </Link>
          ))}

      </div>

      {isMobile && (

        <div className=" mt-5">

          <div className=" w-full  py-4 ">
            {navItems &&
              navItems.map((i, index) => (
                <Link key={index} href={`${i.link}`} passHref>
                  <span
                    className={`${activeItem === index
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                      } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                  >
                    {i.label}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}

    </>
  );
};

export default NavItems;
