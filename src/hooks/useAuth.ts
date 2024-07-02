import { BASE_URL, getFromLocalStorage, removeFromLocalStorage } from "@/utils";
import { create } from "zustand";

type AuthState = {
  isUserLoading: boolean;
  user?: Partial<IUser>;
  setUser: (user: Partial<IUser>) => Promise<void>;
  logout: () => void;
  getUser: () => void;
};
const useAuth: any = create<AuthState>((set) => ({
  isUserLoading: true,
  user: {},
  setUser: async (user: Partial<IUser>) => {
    set({ user: { ...user } });
  },
  logout() {
    set({ user: undefined });
    typeof window !== "undefined" && removeFromLocalStorage("ACCESS_TOKEN");
  },
  getUser: async () => {
    const accessToken = getFromLocalStorage("ACCESS_TOKEN");
  
    if (!accessToken) {
      set({ user: {}, isUserLoading: false });
      return;
    }
  
    try {
      const res = await fetch(`${BASE_URL}/user/self`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (res?.status === 401) {
        window?.localStorage?.removeItem("ACCESS_TOKEN");
        set({ user: {}, isUserLoading: false });
        return;
      }
  
      if (res?.status === 200) {
        const data = await res.json();
        const userData = data?.data;
        set({ user: { ...userData }, isUserLoading: false });
        return;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      set({ user: {}, isUserLoading: false });
    }
  },
  
}));

export default useAuth;