import { useState } from "react";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import Footer from "./Footer";
import useAuthStore from "../store/authStore";
import useWindowWidth from "../hooks/useWindowsWidth";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const windowWidth = useWindowWidth();
  const { userProfile, handleOpenModalLogin } = useAuthStore(
    ({ userProfile, handleOpenModalLogin }) => ({ userProfile, handleOpenModalLogin })
  );

  return (
    <div
      className={`h-full flex flex-col transition-all ${
        windowWidth < 1280 && (isOpen ? "w-20" : "w-9")
      }`}>
      <div
        className='inline xl:hidden m-2 mt-3 hover:text-tik text-xl w-fit cursor-pointer' 
        onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {(isOpen || windowWidth >= 1280) && (
        <div
          className={
            "xl:w-400 w-20 flex flex-col flex-1 justify-start p-3 overflow-y-auto" +
            " xl:mb-5 border-r-2 border-gray-100 xl:border-0"
          }>
          <div className='border-b-2 border-gray-200 xl:pb-4 mb-4 xl:mb-0'>
            <Link href='/'>
              <div
                className={
                  "flex items-center gap-3 hover:bg-primary" +
                  " p-3 justify-center xl:justify-start" +
                  " cursor-pointer font-semibold text-tik rounded"
                }>
                <p className='text-2xl '>
                  <AiFillHome />
                </p>
                <span className='text-xl hidden xl:block '>For you</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className='px-2 py-4 hidden xl:block'>
              <p className='text-gray-400'>Log in to like and comment on videos</p>
              <div className='pr-4'>
                <button
                  className={
                    "bg-white text-lg text-tik border-tik" +
                    " border-[1px] font-semibold px-6 py-3 rounded-md outline-none " +
                    "w-full mt-3 hover:bg-tikL cursor-pointer"
                  }
                  onClick={handleOpenModalLogin}>
                  Log In
                </button>
              </div>
            </div>
          )}
          <Discover />
          <Footer />
        </div>
      )}
    </div>
  );
};
