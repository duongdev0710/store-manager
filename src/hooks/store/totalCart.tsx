import { create } from "zustand";

const useTotalCartStore = create((set) => ({
    totalCart: 0,
    setTotalCart: () => set((state: any) => (
        {
          totalCart: state.totalCart + 1
        }
    )),
    removeTotalCart: () => set({ totalCart: 0 }),
  }))

  export default useTotalCartStore