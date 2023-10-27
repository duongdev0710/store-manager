import Link from "next/link"
import PageNavBar from "./components/Navbar"
export const PageNavbar = () => {
  return (
    <>
      <div className="flex justify-between py-2 px-4 bg-white">
        <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width={30} height={30}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"></path>
        </svg>

        <input className="border border-black outline-none p-2 rounded-lg" type="text" placeholder="Search..." />

        <div className="flex items-center relative">
          <Link href={'/store/cart'}> 
            <span>Giỏ hàng</span>
            <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width={25} height={25}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
            </svg>
            <span className="w-[22px] h-[22px] top-0 right-[-13px] text-center rounded-[50%] bg-red-600 text-white absolute">
                1
              </span>
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