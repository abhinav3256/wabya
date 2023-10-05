// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { FormControlLabel } from '@mui/material'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'



// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))




// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

const ClientDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)


  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }


  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu' className='client-dropdown'>
        <BellOutline />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem disableRipple sx={{ background: 'rgba(145,85,253,0.5)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: '600' }}>Filter Clients</Typography>

          </Box>
        </MenuItem>

          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex'}}>

              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', flexDirection: 'column', textTransform : 'uppercase' }}>
              <MenuItemTitle>
                <FormControlLabel label='All' control={<Checkbox name='filter_client' id='filter_client' value={'All'} />} />
              </MenuItemTitle>
              <MenuItemTitle>
                <FormControlLabel label='Active' control={<Checkbox name='filter_client' id='filter_client' value={'Active'} />} />
              </MenuItemTitle>
              <MenuItemTitle>
                <FormControlLabel label='inactive' control={<Checkbox name='filter_client' id='filter_client' value={'Inactive'} />} />
              </MenuItemTitle>
              </Box>
            </Box>
          </MenuItem>

      </Menu>
    </Fragment>
  )
}

export default ClientDropdown
