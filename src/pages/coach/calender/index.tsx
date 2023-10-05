// ** MUI Imports

import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { app } from '../../../firebaseConfig'


// ** Calender Components Imports
import Calender from 'src/views/calender/Calender'

const CalenderBasic = () => {
  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem('coachId')

    if(!token){
        router.push('/client/login')
    }
}, [])

  return (
        <Calender/>
  )
}

export default CalenderBasic
