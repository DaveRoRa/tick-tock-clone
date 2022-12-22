import create, { StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { AuthStore } from "../types";

const authStore: StateCreator<AuthStore, [], [], AuthStore> = (set) => ({
  userProfile: null,
  logInUser: (user) => set({ userProfile: user }),
  logOutUser: () => set({ userProfile: null }),
  modalLoginIsOpen: false,
  handleCloseModalLogin: () => set({ modalLoginIsOpen: false }),
  handleOpenModalLogin: () => set({ modalLoginIsOpen: true })
});

const useAuthStore = create<AuthStore>()(persist(authStore, { name: "auth" }));

export default useAuthStore;
