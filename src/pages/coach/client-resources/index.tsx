// ** MUI Imports

import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { app } from '../../../firebaseConfig'


// ** Demo Components Imports
import ClientResources from "src/views/clientDetail/ClientResources"


const ClientResourcesBasic = () => {

  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem('coachId')

    if(!token){
        router.push('/coach/login')
    }
}, [])

  return (
        <ClientResources/>
  )
}

export default ClientResourcesBasic
