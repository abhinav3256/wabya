// ** Icon imports
// import Login from 'mdi-material-ui/Login'
// import Table from 'mdi-material-ui/Table'
// import CubeOutline from 'mdi-material-ui/CubeOutline'
// import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
// import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
// import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
// import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
// import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CalendarPlus from 'mdi-material-ui/CalendarPlus'
import AccountTie from 'mdi-material-ui/AccountTie'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      title: 'General Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      title: 'Calender',
      icon: CalendarPlus,
      path: '/calender'
    },
    {
      title: 'Clients',
      icon: AccountTie,
      path: '/clients'
    },

    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
