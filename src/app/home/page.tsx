'use client'
import LayoutPageTest from "@/components/Layout/pageLayoutDragTest"
import _Modal from "@/components/Modal"
import { useState } from "react"
import Styles from '@/styles/styles.module.scss'
const HomePage = () => {
    const [openSignatureModal, setOpenSignatureModal] = useState(false)

    const [data, setData] = useState<any[]>([])

    const getData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await response.json()
            setData(data)
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className="h-screen">
            {/* <div className="h-screen w-full display flex justify-center items-center">
                <button className="border border-blue-500 rounded-md p-2 bg-blue-500 text-white font-semibold hover:bg-white hover:text-blue-500" onClick={() => setOpenSignatureModal(true)}>click me </button>
            </div> */}
            <button className="border border-blue-500 rounded-md p-2 bg-blue-500 text-white font-semibold hover:bg-white hover:text-blue-500" onClick={getData}>
                Get data
            </button>

            <div className="flex justify-center">
                <table className="w-[70rem]">
                    <thead className="border border-black">
                        <tr>
                            <th style={{borderLeft: '1px solid black'}}>ID</th>
                            <th style={{borderLeft: '1px solid black'}}>TITLE</th>
                            <th style={{borderLeft: '1px solid black'}}>BODY</th>
                        </tr>
                    </thead>
                    <tbody className="border border-black">
                        {data.length ? data.map((item: any) => {
                            return (
                                <tr style={{border: '1px solid black'}}>
                                    <td style={{borderLeft: '1px solid black'}}>{item.id}</td>
                                    <td className={Styles['an']} style={{borderLeft: '1px solid black'}}>{item.title}</td>
                                    <td className={Styles['an']} style={{borderLeft: '1px solid black'}}>{item.body}</td>
                                </tr>
                            )
                        }) : <tr><td colSpan={3}>Dữ liệu trống</td></tr>}

                    </tbody>
                </table>
            </div>

            {/* <_Modal
                isOpen={openSignatureModal}
                onClose={() => setOpenSignatureModal(false)}
                className="w-full"
                title="Chỉ định vị trí ký và đóng dấu hợp đồng"
                size="xl"
                centered
                style={{width: 980}}
                footer={null}
                closeOnOverlayClick
                closeOnEsc
            >
        <LayoutPageTest linkFileSign=""/>
      </_Modal> */}
        </div>
        // <LayoutPage />
    )
}

export default HomePage
