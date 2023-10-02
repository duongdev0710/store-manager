const PageNav = () => {
    return (
        <div style={{ backgroundImage: `url(${'https://yaninatrekhleb.github.io/restaurant-website/img/petr-sevcovic-qE1jxYXiwOA-unsplash.jpg'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            <ul className="text-center flex justify-center text-white gap-4">
                <li>About</li>
                <li>Reservation</li>
                <li>Menu</li>
                <li>Shop</li>
            </ul>
        </div>
    )
}

export default PageNav