'use client'
import FontStyle from '@/styles/styles.module.scss'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import PulseLoader from "react-spinners/PulseLoader";
import { useState, CSSProperties } from 'react'
import Link from 'next/link'

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
};

const Login = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: '' as string,
            password: '' as string
        }
    })

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const wrapperClasses = classNames(
        'bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
    )

    const btnSubmitClasses = classNames(
        `w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`
    )

    const backgroundClasses = classNames(
        'fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full flex justify-center items-center' //h-[calc(100%-1rem)]
    )

    const onSubmit = (data: any, e: any) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            if (data.username === 'duongdt' && data.password === '123456') {
                router.push('/home')
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Account or password incorrect! Please try again!',
                })
            }
        }, 2000)
    }

    return (
        <div id="authentication-modal" tabIndex={-1} style={{ backgroundImage: `url(${'/images/bg-login.jpg'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className={backgroundClasses}>
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className={`mb-4 text-xl font-medium text-gray-900 dark:text-white text-center ${FontStyle['font-family-dancing-script']}`}>Login</h3>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email" className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${FontStyle['font-family-dancing-script']}`}>Account/Email:</label>
                                <input
                                    type="text"
                                    id="username"
                                    {...register('username')}
                                    disabled={loading}
                                    className={wrapperClasses}
                                    placeholder="Account input..."
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${FontStyle['font-family-dancing-script']}`}>Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password input..."
                                    {...register('password')}
                                    disabled={loading}
                                    className={wrapperClasses}
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
                                <Link href="#" className={`text-sm text-blue-700 hover:underline dark:text-blue-500 ${loading ? 'pointer-events-none' : 'pointer-events-auto'}`}>Forgot password?</Link>
                            </div>
                            <div className='w-full text-center'>
                                <button
                                    type="submit"
                                    className={btnSubmitClasses}
                                >
                                    {loading ? <PulseLoader
                                        color="#ffffff"
                                        loading={loading}
                                        cssOverride={override}
                                        size={10}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    /> : <span>Login to your account</span>}
                                </button>
                            </div>


                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Have not created an account? <Link href="/register" className={`text-blue-700 hover:underline dark:text-blue-500 ${loading ? 'pointer-events-none' : 'pointer-events-auto'}`}>Create Account</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login