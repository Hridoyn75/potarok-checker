import SearchInput from '@/components/SearchInput'
import Navbar from '@/components/nav'
import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  return (
    <main className=' w-full'>
      <div className=' w-full h-screen px-2 bg-[#FFDFCD] flex justify-center items-center'> 

        <div className=" relative bg-white max-w-[1000px] p-3 min-h-[70%] block border-2 border-blue-950 border-r-8 border-b-8 rounded-lg gap-5 md:flex">
        <Navbar />
          <div className=' flex-1 text-center pt-20 mb-3 md:mb-0'>
            <Image 
            src={"/assets/logo.png"}
            width={400}
            height={100}
            className=' mx-auto md:mt-20'
            alt='logo' />
            <p className=' text-[20px] my-2 font-bold'>আপনার Cyber নিরাপত্তায় একটি <br/> <span className=' text-green-500'>Open-source</span>  প্রোজেক্ট </p> 
            <SearchInput />
            <Link href='/report/create' type='button' className=' px-2 py-1 bg-yellow-500 border-2 border-black mt-8 rounded-lg hover:bg-yellow-700' >
            Report New প্রতারক
            </Link>
          </div>
          <div className=' flex-1 flex items-center'>
            <Image 
            src={"/assets/main.png"}
            width={500}
            height={450}
            className=' mx-auto'
            alt='find প্রতারক'
             />
          </div>

        </div>
      </div>
    </main>
  )
}
