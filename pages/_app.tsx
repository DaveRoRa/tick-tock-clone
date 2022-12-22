import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { Navbar } from "../components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);
  const { route } = useRouter();

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) {
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={"" + process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}>
      <div className='h-full flex flex-col w-full caret-tik overflow-hidden'>
        <ToastContainer
          autoClose={2000}
          position='top-center'
          hideProgressBar
          theme="dark"
          className="text-sm text-center font-semibold md:!w-[700px] opacity-95"
          bodyClassName=""
          toastClassName='!bg-zinc-800 min-h-0 rounded-sm p-[6px]'
          closeButton={false}
          pauseOnHover
          pauseOnFocusLoss
        />
        {route !== "/details/[id]" && <Navbar />}
        <div className='flex flex-col overflow-hidden h-full videos flex-1'>
          <Component {...pageProps} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
