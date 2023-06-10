import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Backdrop, CircularProgress } from '@mui/material';

export default function Update() {

    const [userId, setUserId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [message, setMessage] = useState('');
  

  useEffect(() => {
    const token = localStorage.getItem('usersdatatoken');
    if (token) {
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.id);
    }
    }, []);
    
    const [user, setUser] = useState(null);
    const [showBackdrops, setShowBackdrops] = useState(true);
    
    useEffect(() => {
    
    axios.get(`http://localhost:5000/royecruit/getUser/${userId}`)
      .then(response => {
        setUser(response.data);
        const timer = setTimeout(() => {
          setShowBackdrops(false);
        }, 3000);
    
        return () => clearTimeout(timer);
      })
      .catch(error => {
        console.error(error);
      });
    }, [userId]);
    
    if (!user) {
    return <> <Backdrop open={showBackdrops}>
    <CircularProgress color="inherit" />
  </Backdrop> </>;
    }


  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      await axios.put(`http://localhost:5000/royecruit/users/${userId}/image`, formData);

      setMessage('User image updated successfully');
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while updating the user image');
    }
  };
  return (
    <React.Fragment>

<div>
      <h2>Update User Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpdate}>Update Image</button>
      {message && <p>{message}</p>}
    </div>
        
    </React.Fragment>
  )
}
