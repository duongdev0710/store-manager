import Image from "next/image"

const arrImg = [
  {id: 1, image: 'https://csfood.vn/wp-content/uploads/2016/07/N%C6%B0%E1%BB%9Bc-gi%E1%BA%A3i-kh%C3%A1t-Coca-Cola-lon-250ml.jpg', name: 'Coca Cola', price: 2},
  {id: 2, image: 'https://csfood.vn/wp-content/uploads/2016/04/Nuoc-Giai-Khat-Co-Gas-Mirinda-Huong-Cam.jpg', name: 'Mirinda', price: 2},
  {id: 3, image: 'https://csfood.vn/wp-content/uploads/2016/07/N%C6%B0%E1%BB%9Bc-gi%E1%BA%A3i-kh%C3%A1t-c%C3%B3-gas-Pepsi-th%C3%B9ng-24-lon-x-330ml.jpg', name: 'Pepsi', price: 3},
  {id: 4, image: 'https://csfood.vn/wp-content/uploads/2018/01/Cafe-vi%E1%BB%87t-%C4%91en-u%E1%BB%91ng-li%E1%BB%81n-nescafe-lon-170ml.png', name: 'Cafe Latte', price: 1},
  {id: 5, image: 'https://csfood.vn/wp-content/uploads/2016/07/N%C6%B0%E1%BB%9Bc-gi%E1%BA%A3i-kh%C3%A1t-h%C6%B0%C6%A1ng-chanh-Sprite-chai-1.5L.jpg', name: 'Sprite', price: 2},
]
export const PageLayout = ({Props}: {Props: {getItem: Function, product: any}}) => {
  const {getItem, product} = Props
  return(
    <div className="col-span-2 border border-[#9e9e9e] h-screen">
      <div className="grid grid-cols-3 gap-4">
        {arrImg.map((item: any, index: number) => {
          return (
            <div key={index} className="col-span-1 border border-black">
              <button className="cursor-pointer" onClick={() => {
                const itemOrder = structuredClone(product)
                itemOrder.push({id: item.id, name: item.name, quantity: 1, price: item.price})
                getItem(itemOrder)
              }}>
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
              />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}