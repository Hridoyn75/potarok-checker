"use client"
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const { push } = useRouter()

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if (user) {
          setUser(user)
      } else{
          push("/login")
      }
  })
  },[])

  return (
    <div>Name: { user &&  user.displayName }</div>
  )
}

export default Dashboard