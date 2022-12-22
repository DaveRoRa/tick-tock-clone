import { useDeferredValue } from "react";

import { createPortal } from "react-dom";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import jwt_decode from "jwt-decode";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import useAuthStore from "../store/authStore";
import { DecodedGoogleCredentials } from "../types";
import useWindowWidth from "../hooks/useWindowsWidth";

const LoginModal = () => {
  const windowWidth = useWindowWidth();
  const { handleCloseModalLogin, modalLoginIsOpen, logInUser } = useAuthStore(
    ({ modalLoginIsOpen, handleCloseModalLogin, logInUser }) => ({
      modalLoginIsOpen,
      handleCloseModalLogin,
      logInUser
    })
  );

  const googleWidth = useDeferredValue(windowWidth >= 500 ? 375 : windowWidth - 108);

  const createOrGetUser = async (response: CredentialResponse) => {
    const { sub, name, picture } = jwt_decode<DecodedGoogleCredentials>(
      "" + response.credential
    );

    const user = {
      _id: sub,
      userName: name,
      image: picture
    };

    logInUser(user);
    await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/auth", {
      ...user,
      _type: "user"
    });
    handleCloseModalLogin();
  };

  if (modalLoginIsOpen) {
    return createPortal(
      <div className='fixed w-full h-full z-50 top-0 left-0'>
        <div className='w-full h-full relative'>
          <div className='w-full h-full bg-black opacity-50' />
          <div className='w-full h-full absolute top-0 left-0 flex justify-center items-center'>
            <div
              className={
                "pc:rounded-lg pc:h-[80%] pc:max-h-[693px] pc:w-[483px] bg-white" +
                " pc:pt-12 relative overflow-scroll px-[54px] h-full w-full"
              }>
              <button
                onClick={handleCloseModalLogin}
                className='absolute pc:top-4 top-14 right-4 rounded-full p-1 bg-gray-100'>
                <IoClose className='text-3xl text-gray-700' />
              </button>
              <p className='text-center pc:mt-6 mt-32 mb-4 font-bold text-primary font-sans text-3xl'>
                Log in to TikTik
              </p>
              <GoogleLogin
                onSuccess={createOrGetUser}
                text='continue_with'
                width={`${googleWidth}px`}
                size='large'
                logo_alignment='left'
                onError={() => {}}
              />
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("my_portal") as Element
    );
  }

  return null;
};

export default LoginModal;
