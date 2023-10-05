// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports
// import Link from 'next/link'

// import header & footer files
import Header from 'src/views/frontend/layouts/Header'
import Footer from 'src/views/frontend/layouts/Footer'
import Pricing from 'src/views/frontend/custom-pages/Pricing'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const PricingBasic = () => {

  return (
    <>

    <Pricing/>

    </>
  )
}

PricingBasic.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default PricingBasic
