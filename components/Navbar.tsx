import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import TikTikLogo from "../utils/tiktik-logo.png";
import useAuthStore from "../store/authStore";
import { ProfilePic } from "./ProfilePic";
import LoginModal from "./LoginModal";

export const Navbar = () => {
  const { route } = useRouter();
  const { logOutUser, userProfile, handleOpenModalLogin } = useAuthStore(
    ({ handleOpenModalLogin, userProfile, logOutUser }) => ({
      handleOpenModalLogin,
      userProfile,
      logOutUser
    })
  );
  const handleLogout = () => {
    googleLogout();
    logOutUser();
  };

  return (
    <>
      <div
        className={
          "w-full flex justify-between items-center h-[54px] z-10" +
          " border-b-2 border-gray-200 py-2 px-4 fixed bg-white"
        }>
        <LoginModal />
        <Link href='/'>
          <div className='w-[100px] md:w-[130px]'>
            <Image className='cursor-pointer' src={TikTikLogo} alt='TikTik Logo' />
          </div>
        </Link>
        <div>SEARCH</div>
        <div>
          <div className='flex gap-5 md:gap-10'>
            <Link href='/upload' className='my-auto'>
              <button
                className={
                  "border-2 px-2 md:px-4 font-semibold h-9" +
                  ` ${
                    route === "/upload" ? "bg-gray-100" : "hover:bg-gray-100"
                  } text-base flex items-center gap-2`
                }>
                <IoMdAdd className='text-xl' />{" "}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {userProfile ? (
              <>
                {userProfile?.image && <ProfilePic src={userProfile.image} size={35} />}
                <button type='button' onClick={handleLogout}>
                  <AiOutlineLogout color='red' fontSize={21} />
                </button>
              </>
            ) : (
              <button
                onClick={handleOpenModalLogin}
                className='bg-tik hover:bg-tikD text-white font-bold w-24 rounded h-9'>
                Log in
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='w-full h-[54px]' />
    </>
  );
};
