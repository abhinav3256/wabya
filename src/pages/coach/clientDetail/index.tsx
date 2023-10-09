// ** MUI Imports
import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { app } from '../../../firebaseConfig'

// ** Demo Components Imports
import ClientDetail from 'src/views/clientDetail/ClientDetail'


const clientDetail = () => {

  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem('coachId')

    if(!token){
        router.push('/coach/login')
    }
}, [])

  return (
        <ClientDetail/>
  )
}

export default clientDetail
