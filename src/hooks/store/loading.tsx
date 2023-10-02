import { create } from "zustand";

const useLoadingStore = create((set) => ({
    loading: false,
    setLoading: () => set(() => (
        {
            loading: true 
        }
    )),
    removeLoading: () => set({ loading: false }),
  }))

  export default useLoadingStore