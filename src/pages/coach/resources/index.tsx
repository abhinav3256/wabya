// ** MUI Imports
import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { app } from '../../../firebaseConfig'


// ** Demo Components Imports
import Resources from 'src/views/clientDetail/Resources'


const ResourceBasic = () => {

  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem('coachId')

    if(!token){
        router.push('/coach/login')
    }
}, [])

  return (

        <Resources/>

  )
}

export default ResourceBasic
