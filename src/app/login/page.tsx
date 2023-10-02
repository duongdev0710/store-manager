'use client'
import FontStyle from '@/styles/styles.module.scss'
import { useRouter } from 'next/navigation'
import {set, useForm} from 'react-hook-form'
import useLoadingStore from '@/hooks/store/loading'

const Login = () => {
    const router = useRouter()
    const {register, handleSubmit} = useForm({
        defaultValues: {
            userName: '',
            password: ''
        }
    })
    const setLoading = useLoadingStore((state: any) => state.setLoading)
    const setClearLoading = useLoadingStore((state: any) => state.removeLoading)

    const onSubmit = (data: any, e: any) => {
        e.preventDefault()
        setLoading()
        setTimeout(() => {
            setClearLoading()
            router.push('/home')
        }, 2000)
    }

    return (
        <div id="authentication-modal" tabIndex={-1} style={{ backgroundImage: `url(${'/images/bg-login.jpg'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex justify-center items-center">
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className={`mb-4 text-xl font-medium text-gray-900 dark:text-white text-center ${FontStyle['font-family-dancing-script']}`}>Manager Store</h3>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email" className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${FontStyle['font-family-dancing-script']}`}>Tên tài khoản</label>
                                <input 
                                type="text" 
                                id="userName" 
                                {...register('userName')}
                                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                placeholder="Nhập tên tài khoản..." 
                                required />
                            </div>
                            <div>
                                <label htmlFor="password" className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${FontStyle['font-family-dancing-script']}`}>Mật khẩu</label>
                                <input 
                                type="password" 
                                id="password" 
                                placeholder="Nhập mật khẩu..." 
                                {...register('password')}
                                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                required />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-start">
                                    {/* <div className="flex items-center h-5">
                                        <input 
                                        id="remember" 
                                        type="checkbox" 
                                        value="" 
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                    </div>
                                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nhớ mật khẩu</label> */}
                                </div>
                                <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Quên mật khẩu?</a>
                            </div>
                            <button 
                            type="submit" 
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >Đăng nhập</button>
                            
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Chưa tạo tài khoản? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Tạo tài khoản</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login