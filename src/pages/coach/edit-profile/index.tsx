//  ** Files Imports

// ** React Imports
import { SyntheticEvent, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
// import AccountOutline from 'mdi-material-ui/AccountOutline'
// import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
// import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
// import TabInfo from 'src/views/account-settings/TabInfo'
// import TabSecurity from 'src/views/account-settings/TabSecurity'
import TabAccount from 'src/views/account-settings/TabAccount'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const EditProfile = () => {

  // ** State
  const [value, setValue] = useState<string>('account')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <>
    {/* <section className="edit-profile">
      <div className="container">
        <div className="row">
          <div className="col-sm-12"> */}
            {/* <h2>edit profile</h2> */}
              <TabAccount />
          {/* </div>
        </div>
      </div>
    </section> */}
      
     
             
        
</>
  )
}

export default EditProfile
