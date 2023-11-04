'use client'
import { Tooltip } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import PageTotalCount from "@/components/layout/layout/sidebar/totalCount/TotalCountPage"
import Image from "next/image"
const Cart = () => {
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
      <div >
        {product.length > 0 && product.map((item: any, index: number) => {
          return (
            <>
              <Image src={item.image} width={10} height={100} alt="img.product" />
              <div className="flex justify-between">
                <div key={index} className="flex items-center">
                  <span>{item.name}</span>
                  <button type="button" onClick={() => onChangeQuantity(item, 'up')}>
                    <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width={25} height={25}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                  {item.quantity}
                  <button type="button" onClick={() => onChangeQuantity(item, 'down')} className={`${item.quantity === 1 ? 'opacity-50' : 'opacity-100'}`} disabled={item.quantity === 1}>
                    <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width={25} height={25}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                </div>
                <Tooltip content="Delete product" clasName='px-4 py-2'>
                  <button type="button" onClick={() => onChangeQuantity(item, 'delete')}>
                    <svg fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width={25} height={25}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </Tooltip>
              </div>
            </>

          )
        })}

      </div>
      <PageTotalCount totalPrice={totalPrice} />
      {product.length === 0 && <div>Chưa có sản phẩm trong giỏ hàng!</div>}
    </div>
  )
}

export default Cart