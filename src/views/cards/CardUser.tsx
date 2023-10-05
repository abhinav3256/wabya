// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Links from 'next/link'

// *** ClientDropdown import
import ClientDropdown from 'src/@core/layouts/components/shared-components/ClientDropdown'

const CardUser = () => {
  return (

    <Card sx={{ position: 'relative' }}>
      <CardMedia sx={{ height: '7.625rem' }} image='/images/cards/background-user.png' />
      <Avatar
        alt='Robert Meyer'
        src='/images/avatars/3.png'
        sx={{
          width: 75,
          height: 75,
          left: '5.5rem',
          top: '5rem',
          position: 'absolute',
          border: theme => `0.25rem solid ${theme.palette.common.white}`
        }}
      />
      <CardContent>
        <div className='clients-page'>
        <ClientDropdown/>
        </div>
        <Box sx={{ mt: 5.75, mb: 8.75, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }} >
          <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6'>Robert Meyer</Typography>
            <Typography variant='caption'>Private</Typography>
          </Box>
          <div className="view-details">
            <Links href='/clientDetail'>View Details</Links>
          </div>
        </Box>
        <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            Next Session :
          </Typography>
        </Box>
        <Box>
          <Typography variant='body1'>Thursday, 7 January 2023</Typography>
          <Typography variant='caption'>11:11 AM</Typography>
        </Box>

      </CardContent>
    </Card>

  )
}

export default CardUser
