import ReportForm from "@/components/reportform";
import BackButton from "@/components/back-button";


const NewReport = () => {
  return (
    <>
        <div className=" flex justify-center items-center h-screen w-full">
            <div className=" pt-12 md:pt-5  relative text-center p-5 max-w-[90%] w-[900px] min-h-[70%] bg-white border-2 border-blue-950 border-r-8 border-b-8 rounded-lg">
                <BackButton />
                <h1 className=" text-3xl py-3 text-blue-900 font-extrabold">Report a প্রতারক</h1> 
                <p className=" text-sm pb-5 text-slate-500">Please keep in mind that you will be permanently banned for Submitting false Report</p>
                <ReportForm />
            </div>
        </div>
    </>
  )
}

export default NewReport