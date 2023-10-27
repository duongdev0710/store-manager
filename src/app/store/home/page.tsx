'use client'
import { PageLayout } from "components/layout/Page"
import { useState } from "react"
const HomePage = () => {
    const [item, setItem] = useState([])
    const [selectItem, setSelectItem] = useState(0)

    return <PageLayout Props={{ getItem: setItem, product: item, selectItem: selectItem }} />
}


export default HomePage