'use client'
import { useSearchParams } from 'next/navigation'
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/context/authContext';

const LoginSuccess = () => {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const userDetails = JSON.parse(code);
    const { push } = useRouter();
    const { setCurrentUser } = useContext(AuthContext);

    setCurrentUser(userDetails);
    useEffect(()=>{
        push('/');
    },[push])


    
    return (
    <div className=' text-left'>redirecting...</div>
  )
}

export default LoginSuccess