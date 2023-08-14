import { BsFillSkipBackwardBtnFill } from 'react-icons/bs';
import Link from "next/link";

const BackButton = ({href}) => {
  return (
    <Link href={href ? href : "/"} className=" text-[#172554] px-3 py-1 absolute top-4 left-4 border-2 border-blue-950 border-r-4 border-b-4 rounded-lg">
        <BsFillSkipBackwardBtnFill />
    </Link>
  )
}

export default BackButton