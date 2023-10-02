'use client'
import useLoadingStore from "@/hooks/store/loading"
import {ClipLoader} from 'react-spinners'

const Loading = () => {
    const loading = useLoadingStore((state: any) => state.loading)

    return(
        <>
            {loading && 
                <div
                className={`flex items-center justify-center `}
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  position: 'absolute',
                  zIndex: 1000,
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                }}
              >
                <ClipLoader color="#FF820A" size={100} />
              </div>
            }
        </>
    )
}

export default Loading