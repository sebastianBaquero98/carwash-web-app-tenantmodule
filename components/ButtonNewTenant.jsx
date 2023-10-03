"use client";

import { useRouter } from 'next/navigation';

const ButtonNewTenant = () => {
    const router = useRouter();

    const handleClick = () => {
    router.push('/add-tenant')
  }
  return (
    <button onClick={handleClick} id='add-user-type' className='general-add-button'>Add Tenant</button>
  )
}

export default ButtonNewTenant