import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import useAuth from "./useAuth";
import { PageLoader } from "@/core";
const AdminProtected = (PassedComponent: any) =>
  function NewComponent(props: any) {
    const { user, logout, isUserLoading } = useAuth();
    const { push, asPath } = useRouter();
    let mounted = useRef<boolean>(false);
    useEffect(() => {
      mounted.current = true;
      if (!isUserLoading) {
        if (!user?._id) {
          push("/");
          logout();
        } else if (user?.isBlocked) {
          push("/");
          logout();
        } else if (user?.role !== "ADMIN") {
          push("/");
          logout();
        }
      }
      return () => {
        mounted.current = false;
      };
    }, [user, push, asPath]);

    return <>{user?._id ? <PassedComponent {...props} /> : <PageLoader />}</>;
  };

export default AdminProtected;
