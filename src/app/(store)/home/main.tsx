'use client'
import { PageLayout } from "@/components/templates/Content"
import { useState } from "react"
const MainPage = () => {
    const [item, setItem] = useState([])
    const [selectItem, setSelectItem] = useState(0)

    return <PageLayout Props={{ getItem: setItem, product: item, selectItem: selectItem }} />
}


export default MainPage