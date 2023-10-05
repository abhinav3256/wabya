// ** MUI Imports
import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { app } from '../../../../firebaseConfig'

// ** Demo Components Imports
import ClientDetail from 'src/views/clientDetail/ClientDetail'


const clientDetail = () => {

  const router = useRouter()
  const { id } = router.query;



  return (
        <ClientDetail/>
  )
}

export default clientDetail
