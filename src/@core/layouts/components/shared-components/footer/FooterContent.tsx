// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import themeConfig from 'src/configs/themeConfig'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
       &copy; {` ${new Date().getFullYear()} ${themeConfig.templateName} `} | All Rights Reserved
        {/* <Box component='span' sx={{ color: 'error.main' }}>
          ❤️
        </Box> */}

      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <span>Reach Us :</span>
          <Link target='_blank' href='https://www.htlogics.com/'>
          www.htlogics.com
          </Link>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
