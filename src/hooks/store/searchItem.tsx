import { create } from "zustand";

const useSearchItemStore = create((set) => ({
    item: '',
    setSearchItem: (value: any) => set(() => (
        {
            item: value 
        }
    )),
    removeSearchItem: () => set({ item: '' }),
  }))

  export default useSearchItemStore