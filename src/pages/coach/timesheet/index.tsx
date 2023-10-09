
import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { app } from '../../../firebaseConfig'

import Timesheet from 'src/views/calender/Timesheet'


const TimesheetBasic = () => {


  const router = useRouter()

  useEffect(() => {
    const token = sessionStorage.getItem('coachId')

    if(!token){
        router.push('/coach/login')
    }
  }, [])


  return (
      <Timesheet/>
  )
}

export default TimesheetBasic
