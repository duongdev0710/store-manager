import { Metadata } from "next"
import MainPage from "./main"
export const metadata: Metadata = {
    title: 'Trang chủ',
    description: 'Home',
  }
const HomePage = () => {
    return <MainPage />
}
export default HomePage