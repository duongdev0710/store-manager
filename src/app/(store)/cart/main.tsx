'use client'
import { Tooltip } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import PageTotalCount from "@/components/templates/layout/sidebar/totalCount/TotalCountPage"
import Image from "next/image"
const MainPage = () => {
  const [product, setProduct] = useState<any[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    if (product.length === 0) {
      const productLocalStorage = localStorage.getItem('product')
      if (productLocalStorage) {
        setProduct(JSON.parse(productLocalStorage))
      }
    }
  }, [])

  // useEffect(() => {
  //   let total = 0
  //   product.map((itemPrice: any) => {
  //     total += itemPrice.quantity * itemPrice.price
  //   })
  //   setTotalPrice(total)
  // }, [product])

  const onChangeQuantity = (item: any, action: string) => {
    const itemOrder = structuredClone(product)
    for (let i = 0; i < itemOrder.length; i++) {
      if (item.id === itemOrder[i].id) {
        if (action === 'delete')
          itemOrder.splice(i, 1)
        else if (action === 'up')
          itemOrder[i].quantity++
        else
          itemOrder[i].quantity--
        break
      }
    }
    // changeItem(itemOrder)
  }
  return (
    <div className="flex flex-col justify-between">
      <div className="p-4">
        {product.length > 0 && product.map((item: any, index: number) => {
          return (
            <div className="flex flex-col items-center relative border border-black bg-white p-2">
              <Image src={item.image} width={100} height={100} alt="img.product" />
              <Tooltip content="Delete product" clasName='px-4 py-2'>
                <button className="absolute top-0 right-0" type="button" onClick={() => onChangeQuantity(item, 'delete')}>
                  <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" color="red" width={16} height={16}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </Tooltip>
              <span className="font-semibold">{item.name}</span>
              <div className="flex justify-between">

                <div key={index} className="flex items-center">

                  <button type="button" className="hover:bg-[#ddd] hover:text-white hover:rounded-full" onClick={() => onChangeQuantity(item, 'up')}>
                    <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width={25} height={25}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                  <span className="font-semibold text-green-600 px-2">{item.quantity}</span>
                  <button type="button" onClick={() => onChangeQuantity(item, 'down')} className={`${item.quantity === 1 ? 'opacity-50' : 'opacity-100'} hover:bg-gray-500 hover:text-white hover:rounded-full`} disabled={item.quantity === 1}>
                    <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width={25} height={25}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                </div>

              </div>
            </div>

          )
        })}

      </div>
      <PageTotalCount totalPrice={totalPrice} />
      {product.length === 0 && <div>Chưa có sản phẩm trong giỏ hàng!</div>}
    </div>
  )
}

export default MainPage