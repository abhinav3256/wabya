// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports
// import Link from 'next/link'

// import header & footer files
import Header from 'src/views/frontend/layouts/Header'
import Footer from 'src/views/frontend/layouts/Footer'
import CoachingJourney from 'src/views/frontend/custom-pages/CoachingJourney'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const CoachingJourneyBasic = () => {

  return (
    <>

    <CoachingJourney/>

    </>
  )
}

CoachingJourneyBasic.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default CoachingJourneyBasic
