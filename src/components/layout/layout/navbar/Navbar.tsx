import Link from "next/link"
import Image from "next/image"
import useTotalCartStore from "@/hooks/store/totalCart"
import { useState } from "react"
import useSearchItemStore from "@/hooks/store/searchItem"

export const PageNavbar = () => {
  const totalCart = useTotalCartStore((state: any) => state.totalCart)
  const [itemSearch, setItemSearch] = useState('')
  const setItem = useSearchItemStore((state: any) => state.setSearchItem)
  const removeItem = useSearchItemStore((state: any) => state.removeSearchItem)

  const onClickSearch = () => {
    removeItem('')
    if (itemSearch) {
      setTimeout(() => {
        setItem(itemSearch)
      }, 100)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center py-2 px-4 bg-white">
        <Image src="/images/logo.png" alt="logo" width={65} height={65} />

        <div className="flex items-center">
          <input className="border border-black outline-none p-2 rounded-lg h-8 w-96" value={itemSearch} onChange={(e: any) => setItemSearch(e.target.value)} type="text" placeholder="Search..." />
          <span onClick={onClickSearch}>
            <svg className="mx-2 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width={23} height={23}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
            </svg>
          </span>

        </div>

        <div className="flex items-center relative">
          <Link href={'/cart'}>
            <div className="flex">
              <span>Giỏ hàng</span>
              <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width={25} height={25}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
              </svg>
              <span className="w-[22px] h-[22px] top-[-9px] border focus:border-sky-500 right-[-13px] text-center rounded-[50%] bg-red-600 text-white absolute">
                {totalCart}
              </span>
            </div>

          </Link>
        </div>

        {/* <div>
          <label htmlFor="category">Danh mục</label>
          <select className="border border-black" name="category" id="" onChange={(e: any) => getSelectItem(e.target.value)}>
            <option className="p-2 border-b-[#9e9e9e]" value="0">All</option>
            <option className="p-2 border-b-[#9e9e9e]" value="1">Coca Cola</option>
            <option className="p-2 border-b-[#9e9e9e]" value="2">Mirinda</option>
            <option className="p-2 border-b-[#9e9e9e]" value="3">Pepsi</option>
            <option className="p-2 border-b-[#9e9e9e]" value="4">Cafe Latte</option>
            <option value="5">Sprite</option>
          </select>
        </div> */}
      </div>
    </>

  )
}