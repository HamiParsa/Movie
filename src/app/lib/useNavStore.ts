// store/useNavStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the shape of our navigation state
interface NavState {
  activeLink: string;
  setActiveLink: (link: string) => void;
}

// Create a Zustand store for navigation state
// `persist` is used so the active link is saved in localStorage
export const useNavStore = create<NavState>()(
  persist(
    (set) => ({
      activeLink: "Home", // default value
      setActiveLink: (link) => set({ activeLink: link }), // function to update the active link
    }),
    {
      name: "nav-storage", // localStorage key name
    }
  )
);
