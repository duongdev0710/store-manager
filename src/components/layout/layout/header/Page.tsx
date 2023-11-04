'use client'
import Link from "next/link"
import { Tooltip, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TypeUser {
  token: string;
  userName: string;
}
const PageHeader = () => {
  const router = useRouter()

  const [auth, setAuth] = useState<TypeUser>({
    token: '',
    userName: ''
  })

  useEffect(() => {
    const authUser = localStorage.getItem('currentUser')
    if (authUser) {
      setAuth(JSON.parse(authUser))
    }
  }, [])
  return (
    <div className="text-right">
      {
        auth.userName ?
          <div className="flex items-center">
            <Tooltip content="Preferences" className="bg-black px-4 py-2">
              <Button className="px-2">
                <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" color="black" width={25} height={25}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </Button>
            </Tooltip>

            <span>{auth.userName}</span>

            <Tooltip content="Logout" className="bg-black px-4 py-2">
              <Button onClick={() => {
                localStorage.removeItem('currentUser')
                router.push('/login')
              }}>
                <svg fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" color="black" width={25} height={25}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"></path>
                </svg>
              </Button>
            </Tooltip>
          </div> : <div>
            <Link href="/login">
              <span className="mr-4" >Đăng nhập</span>
            </Link>
            <Link href="/register">
              <span>Đăng ký</span>
            </Link>
          </div>
      }
    </div>
  )
}

export default PageHeader