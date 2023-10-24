const PageTotalCount = ({totalPrice}: {totalPrice: number}) => {
  return(
    <div>
      <span className="pr-4">Total price:</span>
      <span className="font-bold">{totalPrice} $</span>
    </div>
  )
}

export default PageTotalCount