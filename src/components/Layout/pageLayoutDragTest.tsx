import React, { useEffect, useRef, LegacyRef } from "react"
import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from "react"
import interact from "interactjs"
// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import Swal from "sweetalert2";
// import { useDispatch } from "react-redux";
// import { setLoading } from "Stores/Reducers/LoadingSlice";
// import Tooltip from "@mui/material/Tooltip";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const LayoutPageSignLocation = ({linkFileSign}: {linkFileSign: string}) => {
    // const dispatch = useDispatch()
    const [numPages, setNumPages] = useState(1)
    const [signCoordinates, setSignCoordinates] = useState({ x: 0, y0: 0, y1: 0, page: 0 })

    useEffect(() => {
        let initialX = 0, initialY = 0;
        interact('.react-pdf__Page__canvas').dropzone({
            // only accept elements matching this CSS selector
            accept: '.resize-drag',// null,
            // Require a 75% element overlap for a drop to be possible
            overlap: 1,
            ondragenter: function (event) {
                // draggedElement.style.transform = 'none'
                // event.relatedTarget.textContent = 'Dragged in'
                event.relatedTarget.lastChild.style.border = '1px solid #92bff5'
                event.relatedTarget.lastChild.style.backgroundColor = 'rgba(255, 233, 178, 1)'
                event.relatedTarget.lastChild.style.color = '#fe7744'
            },
            ondragleave: function (event) {
                // event.relatedTarget.textContent = 'Dragged out'
                // event.relatedTarget.style.border = '1px solid black'
                event.relatedTarget.lastChild.style.border = '1px solid #92bff5'
                event.relatedTarget.lastChild.style.backgroundColor = 'rgba(189, 217, 249, 1)'
                event.relatedTarget.lastChild.style.color = '#2680eb'
            },
            ondrop: function (event) {
                // event.relatedTarget.textContent = 'Dropped'
                // event.relatedTarget.style.border = '1px solid black'
                // event.relatedTarget.style.padding = '3px'
                // initialX = event.relatedTarget.getAttribute('data-x')
                // initialY = event.relatedTarget.getAttribute('data-y')
                // console.log(initialX, initialY);
            }
        })

        interact('.resize-drag')
            .draggable({
                inertia: true,
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'react-pdf__Page__canvas',
                        endOnly: true
                    })
                ],
                autoScroll: true,
                listeners: {
                    move: function (event) {
                        const target = event.target;
                        // // keep the dragged position in the data-x/data-y attributes
                        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                        // translate the element
                        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                        target.setAttribute('data-x', x)
                        target.setAttribute('data-y', y)
                    },
                    start(event) {
                        // event start drag
                    },
                    end(event) {
                        // Xử lý sự kiện drop phần tử
                        //   const pageNumberRelated = parseInt((event.relatedTarget.className.split(' ')[0]).split('-')[1]) // Số trang đang chứa đối tượng kéo thả
                        //   const pageNumberRelated = event.relatedTarget.offsetParent.getAttribute('data-page-number') // Số trang đang chứa đối tượng kéo thả
                        if (event.relatedTarget) { // kéo vào trong vùng canvas
                            initialX = 0
                            initialY = 0
                            const pageNumberRelated = event.relatedTarget.offsetParent.dataset.pageNumber;
                            const reactZonePage = document.querySelector('.page-' + pageNumberRelated)
                            const pageTop = reactZonePage?.getBoundingClientRect()
                            //   const elementTop = event.rect.top
                            const elementTop = (document.querySelector('.resize-drag') as HTMLElement)
                            const coordinatesElementTop = elementTop.getBoundingClientRect().top
                            if (pageTop && coordinatesElementTop) {
                                const topElementInCanvasPage = coordinatesElementTop /*top distance phần tử drag drop*/ - pageTop?.top /* pageTop: top distance phần tử canvas*/
                                if (event.target.id.search('-out-page') !== -1) {
                                    const zoneDefaultElementDragDrop = (document.querySelector('.zone-out-drag') as HTMLElement)
                                    const rectZoneWidthDefaultDragDrop = zoneDefaultElementDragDrop.getBoundingClientRect().width // width chứa đối tượng kéo thả (khi kéo thả vào sẽ trừ đi khoảng cách này để lấy khoảng cách trong file pdf)
                                    const getDataX = event.target.getAttribute('data-x') // toạ độ X tính từ điểm bắt đầu được drag
                                    const coordinateX = getDataX - rectZoneWidthDefaultDragDrop // toạ độ X cần lấy sau khi đã được kéo vào zone canvas
                                    let heightPageContained = 0;
                                    // vòng lặp để lấy tổng height tất cả các trang cho đến trang chứa phần tử drag drop
                                    for (let i = 1; i < pageNumberRelated; i++) {
                                        const pages = document.querySelector('.page-' + i)
                                        if (pages) {
                                            const pageHeight = pages.getBoundingClientRect().height
                                            heightPageContained += pageHeight
                                        }
                                    }
                                    const distanceElementTopPage = heightPageContained + topElementInCanvasPage /* distance top element to top page */
                                    // Begin set coordinates x and y of element
                                    event.target.style.webkitTransform = event.target.style.transform = 'translate(' + coordinateX + 'px, ' + distanceElementTopPage + 'px)';
                                    event.target.setAttribute('data-x', coordinateX)
                                    event.target.setAttribute('data-y', distanceElementTopPage)
                                    // End

                                    setSignCoordinates({
                                        x: Math.round(coordinateX),
                                        // y: topElementInCanvasPage,
                                        y0: Math.round(event.relatedTarget.offsetHeight - topElementInCanvasPage),
                                        y1: topElementInCanvasPage,
                                        page: pageNumberRelated
                                    })
                                    const visibleShowIconClear = (document.getElementById('remove-signature') as HTMLElement)
                                    visibleShowIconClear.style.visibility = 'visible'
                                    event.target.style.position = 'absolute'
                                    event.target.lastChild.style.backgroundColor = 'rgba(255, 233, 178, 1) !important'
                                    event.target.lastChild.style.border = '1px solid #92bff5'
                                    event.target.lastChild.style.color = '#fe7744'
                                    event.target.id = event.target.id.replace('-out-page', '') // clear id out side after drag drop
                                    const reactPdfDocumentDom = document.querySelector('.react-pdf__Document')
                                    reactPdfDocumentDom?.appendChild(event.target) // append element to document
                                } else {
                                    setSignCoordinates({
                                        x: Math.round(event.target.getAttribute('data-x')),
                                        y0: Math.round(pageNumberRelated > 1 ? event.relatedTarget.offsetHeight - topElementInCanvasPage : event.relatedTarget.offsetHeight - event.target.getAttribute('data-y')), // toạ độitin theo BOTTOM
                                        y1: pageNumberRelated > 1 ? topElementInCanvasPage : event.target.getAttribute('data-y'),
                                        page: pageNumberRelated
                                    })
                                }
                            } else {
                                // Swal.mixin({
                                //     toast: true,
                                //     position: 'top-end',
                                //     showConfirmButton: false,
                                //     timerProgressBar: false,
                                //     didOpen: (toast) => {
                                //         toast.addEventListener('mouseenter', Swal.stopTimer)
                                //         toast.addEventListener('mouseleave', Swal.resumeTimer)
                                //     }
                                // }).fire({
                                //     icon: 'warning',
                                //     title: 'Lỗi kéo thả vị trí ký. Vui lòng thử lại!',
                                //     timer: 1500
                                // })
                            }
                        } else {
                            event.target.style.webkitTransform = event.target.style.transform = `translate(${initialX ? initialX : 0}px, ${initialY ? initialY : 0}px)`;
                            event.target.setAttribute('data-x', initialX ? initialX : 0)
                            event.target.setAttribute('data-y', initialY ? initialY : 0)
                        }
                    },
                }
            })
        // resize area signature
        // cho phep resize theo chieu nao
        // interact('.not-out-drop')
        //     .on('resizeend', resizeSignature)
        //     .resizable({
        //         edges: {left: false, right: false, bottom: false, top: false},
        //         listeners: {
        //             move: resizableListener,
        //             onend: resizeSignature
        //         },
        //         modifiers: [
        //             interact.modifiers.restrictEdges({
        //                 outer: '.drop-zone'
        //             }),
        //             // minimum size
        //             interact.modifiers.restrictSize({
        //                 // min: { width: 100, height: 32 }
        //             })
        //             // keep the edges inside the parent (resize kich thuoc duy tri 1 khung hinh goc khi keo tha)
        //         ],
        //         inertia: true
        //     });

        interact('.resize-drag').resizable({
            edges: { left: false, top: false, bottom: false, right: false },
            listeners: {},
            modifiers: []
        })

        interact.addDocument(document)

        return () => {
            interact('.react-pdf__Page__canvas').unset();
            // interact('.drop-zone').unset();
            interact('.resize-drag').unset();
            interact('.react-pdf__Document').unset();
            interact.removeDocument(document);
        }

    }, [])

    // const onHandleClearLocationLine = (c: any, canvas_size: any, elementDrag: any, ctx: any) => {
    //     for (let i = 0; i < pageNumber; i++) {
    //         if (elementDrag.page != (i + 1)) {
    //             // clear line pages
    //             let rectDom = (document.getElementById("canvas-step3-fake-" + `${i + 1}`) as HTMLCanvasElement);
    //             let ctx_clear = rectDom.getContext("2d");
    //             let canvas_clear = c.getBoundingClientRect();
    //             if (ctx_clear) {
    //                 ctx_clear.clearRect(0, 0, canvas_clear.width, canvas_clear.height); // clear content canvas
    //             }
    //         } else {
    //             ctx.clearRect(0, 0, canvas_size.width, canvas_size.height); // clear content canvas
    //         }
    //     }
    // }

    // Function resize element
    // const resizeSignature = (event: any) => {
    //     let x = parseFloat(event.target.getAttribute('data-x')) || 0;
    //     let y = parseFloat(event.target.getAttribute('data-y')) || 0;
    // }

    const renderPages = () => {
        const pages = []
        for (let i = 1; i <= numPages; i++) {
            pages.push(
                <Page 
                className={`page-${i} pb-[3px] react-pdf__Page`} 
                scale={1} 
                key={i} 
                pageNumber={i} 
                renderTextLayer={false} 
                renderAnnotationLayer={false}
                renderForms={true} />
            )
        }
        return pages;
    }

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        let classDocument = (document.querySelector('.react-pdf__Document') as HTMLElement)
        if (classDocument) {
            classDocument.style.display = 'flex'
            classDocument.style.position = 'relative'
            classDocument.style.flexDirection = 'column'
            // classDocument.style.alignItems = 'center'
            classDocument.style.backgroundColor = '#ddd' //'#f3f7f9'
            // dispatch(setLoading(false))
            setNumPages(numPages)
        }
    }

    const removeSignature = () => {
        const domSignInZone = document.getElementById('abc');
        const domParentOutZone = document.getElementById('zone-out');
        const domElementDrag = document.getElementById('element-resize-drag');
        if (domElementDrag) {
            domElementDrag.style.backgroundColor = 'rgba(189, 217, 249, 1)'
            domElementDrag.style.color = '#2680eb'
            domElementDrag.style.border = '1px solid #92bff5'
        }
        const visibleShowIconClear = (document.getElementById('remove-signature') as HTMLElement)
        visibleShowIconClear.style.visibility = 'hidden'
        if (domSignInZone && domParentOutZone) {
            domSignInZone.id = domSignInZone.id.replace('abc', 'abc-out-page')
            domSignInZone.style.transform = `translate(0px, 0px)`;
            domSignInZone.setAttribute('data-x', '0')
            domSignInZone.setAttribute('data-y', '0')
            domParentOutZone.appendChild(domSignInZone)
        }

        setSignCoordinates({
            x: 0,
            y0: 0,
            y1: 0,
            page: 0
        })
    }

    return (
        //flex justify-between
        <div style={{borderTop: '1px solid gray'}}>
            <div className="flex justify-between">
                <div className="text-sky-500">Thành phần <span className="text-red-500">(kéo thả)</span>:</div>
                <div></div>
            </div>
            <div className="flex mt-4 justify-between">
                <div id='zone-out' className='zone-out-drag z-10'>
                    <div className="resize-drag block w-[8rem]" id={'abc-out-page'} style={{ borderRadius: '5px' }}>
                        <div id="element-resize-drag"
                            className="relative border border-sky-500 bg-[#92bff5] text-white font-semibold rounded-md px-2 py-1"
                            style={{ border: '1px solid #92bff5', backgroundColor: 'rgba(189, 217, 249, 1)', color: '#2680eb', borderRadius: '5px' }}>
                            <div
                                id="remove-signature"
                                onClick={() => removeSignature()}
                                className="absolute top-[-9px] right-[-9px] cursor-pointer rounded-full"
                                style={{ visibility: 'hidden' }}>
                                {/* <Tooltip title="Xoá vị trí ký">
                                    <svg className="w-6 h-6 text-white bg-red-500 border border-red-500 dark:text-white rounded-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </Tooltip> */}

                            </div>

                            <div className="content-drag font-normal flex" id="element-drag-text">
                            <svg className="text-[#2680eb] w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" width={20} height={20}>
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                                <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                                <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                            </svg>
                                <div>Chữ ký số</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-[0.5rem]">
                        <div className="text-[#F48465] mb-[0.5rem] font-semibold">Vị trí:</div>
                        <div className="grid gap-y-2">
                            <div className="font-semibold">X: <input className="font-normal border border-gray-500 rounded-lg w-20 outline-none px-2" type="text" value={signCoordinates.x} readOnly /></div>
                            <div className="font-semibold">Y: <input className="font-normal border border-gray-500 rounded-lg w-20 outline-none px-2" type="text" value={signCoordinates.y0} readOnly /></div>
                            <div className="font-semibold">Trang: <span className="font-normal">{signCoordinates.page}</span></div>
                        </div>
                        {/* <div>X: {signCoordinates.x}</div>
                        <div>Y_bottom: {signCoordinates.y0}</div>
                        <div>Y_top: {signCoordinates.y1}</div> */}
                        
                    </div>
                </div>

                <div id="sample-contract" className={`border border-[#9e9e9e]`} style={{ height: 'calc(100vh - 150px)', overflow: 'auto' }}>
                    <Document file={'/form/testFile.pdf'} onItemClick={({ dest, pageIndex, pageNumber }) => console.log('Clicked an item from page ' + pageNumber + '!')} onLoadSuccess={onDocumentLoadSuccess}>
                        {renderPages()}
                    </Document>
                </div>
            </div>
        </div>
        

    )

}

export default LayoutPageSignLocation