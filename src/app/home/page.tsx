'use client'
import { PageLayout } from "components/layout/Page"
import { PageSidebar } from "components/sidebar/Page"
import { PageNavbar } from "components/navbar/Page"
import { useState } from "react"
const HomePage = () => {
    const [item, setItem] = useState([])

    return (
        <div className="h-screen">
            <PageNavbar />
            <div className="grid grid-cols-3">
                <PageSidebar Props={{product: item, changeItem: setItem}} />
                <PageLayout Props={{getItem: setItem, product: item}} />
            </div>
        </div>
    )
}


export default HomePage