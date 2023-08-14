import BackButton from "@/components/back-button";
import RenderReports from "@/components/render-reports"

const Reports = () => {
  return (
    <>
     <div className=' w-full py-5 px-2 bg-[#FFDFCD] flex justify-center items-center'> 
        <div className=" relative w-[1000px] max-w-full min-h-[70vh] bg-white p-3 block border-2 border-blue-950 border-r-8 border-b-8 rounded-lg gap-5">
            <BackButton />
            <h1 className=" mt-12 text-2xl border-b-2 border-cyan-600 w-fit pb-1 mb-4">All Reports</h1>
            <RenderReports type="all" />
        </div>
     </div>   

    </>
  )
}

export default Reports