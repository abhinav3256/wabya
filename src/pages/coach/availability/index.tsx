// ** MUI Imports

import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { app } from '../../../firebaseConfig'


// ** Calender Components Imports
import Available from 'src/views/availability/availabilty'

const Availability = () => {
  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem('coachId')

    if(!token){
        router.push('/coach/login')
    }
}, [])

  return (
        <Available/>
  )
}

export default Availability
