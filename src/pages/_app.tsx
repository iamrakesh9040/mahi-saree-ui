import "@/styles/globals.css";
import "@/styles/nprogress.css";
import "react-quill/dist/quill.snow.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Router, useRouter } from "next/router";
import nProgress from "nprogress";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { useAuth } from "@/hooks";

export default function App({ Component, pageProps }: AppProps) {
  const { getUser } = useAuth();
  const { asPath } = useRouter();
  Router.events.on("routeChangeStart", nProgress.start);
  Router.events.on("routeChangeError", nProgress.done);
  Router.events.on("routeChangeComplete", nProgress.done);
  useEffect(() => {
    (async () => {
      getUser();
    })();
  }, [getUser, asPath]);
  return (<>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <Component {...pageProps} />
  </>
  )
}
