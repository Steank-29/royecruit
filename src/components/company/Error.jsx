import { Typography } from '@mui/material'
import React from 'react'

function Error() {
  return (
    <div>
        <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'black',
      }}
    >
      <Typography variant="h1" sx={{fontFamily:"Oswald", fontWeight:"bold"}} component="h1" color="white" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" sx={{fontFamily:"Oswald", fontWeight:"bold",mt:-6}} component="h2" color="white">
        Page Not Found 
      </Typography>
    </div>

    </div>
  )
}

export default Error