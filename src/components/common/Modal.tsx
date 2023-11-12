import React from 'react'
import Modal from 'react-modal'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsChevronLeft } from 'react-icons/bs'

const _Modal = ({
  isOpen = false,
  onClose,
  className = ``,
  title = ``,
  children,
  style,
  onBack,
  hideBackBtn = false,
  header = true,
}: any) => {
  Modal.setAppElement(`body`)
  const customStyles = {
    content: {
      position: 'absolute',
      zIndex: 1000,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      overflow: `unset`,
      borderRadius: `16px`,
      backgroundColor: `#FFFFFF`,
      width: `1200px`,
      padding: `32px 25px`,
      ...style,
    },
    overlay: {
      background: `rgba(0, 0, 0, 0.5)`,
      zIndex: 500,
    },
  }

  return (
    <Modal
      isOpen={isOpen}
      preventScroll={false}
      onAfterOpen={() => {}}
      onRequestClose={() => onClose?.()}
      closeTimeoutMS={150}
      contentLabel={title}
      style={customStyles}
    >
      {header && (
        <div className={`flex flex-row gap-2 justify-between items-center`}>
          <div className="w-8 h-8 cursor-pointer">
            {onBack && (
              <div className="w-8 h-8 justify-center items-center bg-[#F3F3F7] rounded-lg ">
                <BsChevronLeft size={24} onClick={() => onBack?.()} />
              </div>
            )}
          </div>
          <div className={`flex-1 items-center justify-center`}>
            <h1 className={`text-2xl text-center font-bold`}>{title}</h1>
          </div>
          <div className="w-6 h-6 cursor-pointer">
            {!hideBackBtn && (
              <AiFillCloseCircle size={32} fill={`#DCDEE9`} onClick={() => onClose?.()} />
            )}
          </div>
        </div>
      )}

      <div className={className}>{children}</div>
    </Modal>
  )
}

export default _Modal
