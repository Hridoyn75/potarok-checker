import Link from 'next/link'
import React from 'react'

const Button = ({text, url, whenclick, blank, type, disabled }) => {
  return (
    <>
    { (!whenclick && url) &&
    <Link href={url} target={blank ? "_blank": "_self"} className={` hover:bg-slate-400 transition-all ease duration-500 text-[#172554] px-3 py-1 border-2 border-blue-950 border-r-4 border-b-4 rounded-lg`}>
        {text}
    </Link>
    }
    { ((whenclick || type) && !url) && 
    <button 
    onClick={whenclick} 
    type={type}
    disabled={disabled}
    className={` mt-3 hover:bg-slate-400 transition-all ease duration-500 text-[#172554] px-3 py-1 border-2 border-blue-950 border-r-4 border-b-4 rounded-lg`}>
      {text}
    </button>
    }
    { ( !url && !whenclick && !type  ) && <p>Error: url or whenclick or type props is required (Not one at a time)</p>}
    </>
  )
}

export default Button