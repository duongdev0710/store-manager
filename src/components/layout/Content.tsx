import Image from "next/image"
import { useEffect, useState } from "react"
import { Tooltip } from "@material-tailwind/react"
import useTotalCartStore from "@/hooks/store/totalCart"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSearchItemStore from "@/hooks/store/searchItem";

const arrImg = [
  { id: 1, image: 'https://csfood.vn/wp-content/uploads/2016/07/N%C6%B0%E1%BB%9Bc-gi%E1%BA%A3i-kh%C3%A1t-Coca-Cola-lon-250ml.jpg', name: 'Coca Cola', price: 2 },
  { id: 2, image: 'https://csfood.vn/wp-content/uploads/2016/04/Nuoc-Giai-Khat-Co-Gas-Mirinda-Huong-Cam.jpg', name: 'Mirinda', price: 2 },
  { id: 3, image: 'https://csfood.vn/wp-content/uploads/2016/07/N%C6%B0%E1%BB%9Bc-gi%E1%BA%A3i-kh%C3%A1t-c%C3%B3-gas-Pepsi-th%C3%B9ng-24-lon-x-330ml.jpg', name: 'Pepsi', price: 3 },
  { id: 4, image: 'https://csfood.vn/wp-content/uploads/2018/01/Cafe-vi%E1%BB%87t-%C4%91en-u%E1%BB%91ng-li%E1%BB%81n-nescafe-lon-170ml.png', name: 'Cafe Latte', price: 1 },
  { id: 5, image: 'https://csfood.vn/wp-content/uploads/2016/07/N%C6%B0%E1%BB%9Bc-gi%E1%BA%A3i-kh%C3%A1t-h%C6%B0%C6%A1ng-chanh-Sprite-chai-1.5L.jpg', name: 'Sprite', price: 2 },
]
export const PageLayout = ({ Props }: { Props: { getItem: Function, product: any, selectItem: any } }) => {
  const { getItem, product, selectItem } = Props
  const [arrProduct, setArrProduct] = useState<any[]>([])
  const setTotalCart = useTotalCartStore((state: any) => state.setTotalCart)
  const itemSearch = useSearchItemStore((state: any) => state.item)

  useEffect(() =>{
    if (itemSearch) {
      setArrProduct(arrImg.filter(item => (item.name).toLowerCase().search(itemSearch.toLowerCase()) != -1))
    } else setArrProduct(arrImg)
  },[itemSearch])

  // useEffect(() => {
  //   if (selectItem == 0) {
  //     setArrProduct(arrImg)
  //   } else {
  //     setArrProduct(arrImg.filter(item => item.id == selectItem))
  //   }
  // }, [selectItem])

  return (
    <div className="border border-[#9e9e9e] h-screen w-full">
      <div className="grid grid-cols-5 gap-4">
        {arrProduct.map((item: any, index: number) => {
          return (
            <div key={index} className="col-span-1 border border-black relative flex justify-end flex-col bg-white items-center">

              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
              />
              <Tooltip content={item.name}>
                <button className="hover:h-[50px] hover:font-bold cursor-pointer absolute w-full bg-sky-500 bg-opacity-25 flex items-center" onClick={() => {
                  const itemOrder = structuredClone(product)
                  if (product.some((element: any) => element.id == item.id)) {
                    let itemSelect = itemOrder.filter((element: any) => element.id == item.id)[0]
                    itemSelect.quantity++
                  } else {
                    itemOrder.push({ ...item, quantity: 1 })
                  }
                  getItem(itemOrder)
                  setTotalCart(itemOrder.length)
                  toast.success("Bạn đã thêm sản phẩm vào giỏ hàng")
                }}>
                  <svg className="hover:font-bold" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width={25} height={25}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"></path>
                  </svg>
                  <span>Thêm vào giỏ hàng</span>
                </button>
              </Tooltip>

            </div>
          )
        })}
      </div>
    </div>
  )
}