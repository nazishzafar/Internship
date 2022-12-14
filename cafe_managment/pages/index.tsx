import Head from 'next/head'
import Background from '../components/Background'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
    <Background></Background>
    <Footer></Footer>
    

   
    </div>
  )
}
