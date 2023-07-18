import "@/styles/Home/Home.css"
import Banner from '@/components/Home/Banner'
import Row from '@/components/Home/Row'

export default function Home() {
  return (
    <main>
      <Banner/>
      <Row catagory="Romedy"/>
      <h1>Welcome To NewFlix</h1>
    </main>
  
  )
}