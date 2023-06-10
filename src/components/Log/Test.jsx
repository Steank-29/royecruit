import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signInWithPopup , FacebookAuthProvider } from 'firebase/auth';
import { authentication } from '../widgets/Firebase.config';
import axios from 'axios';


const CameraCapture = () => {
  const navigate = useNavigate() ;
  const videoRef = useRef(null);
  const [secondsLeft, setSecondsLeft] = useState(5400); // 1.5 hours in seconds
  const [inactiveCount, setInactiveCount] = useState(0);

  useEffect(() => {
    const captureCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Failed to access the camera:', err);
      }
    };
    captureCamera();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(secondsLeft => secondsLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setInactiveCount(inactiveCount => inactiveCount + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (secondsLeft === 0 || inactiveCount === 3) {
      navigate('/client');
    }
  }, [secondsLeft, inactiveCount]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };



  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(authentication, provider)
    .then((re) => {
      console.log(re);

    })
    .catch((error) => {
      console.log(error.message);
    })
  }

  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
      async function fetchData() {
      const response = await axios.get('http://localhost:5000/royecruit/companies');
      const users = response.data;

        // Update the user count based on the number of IDs
        setUserCount(users.length);
      }
      fetchData();
  }, []); 

  


  return (
    <div style={{ justifyContent: 'left' }}>
      <video
        ref={videoRef}
        autoPlay
        style={{ width: '15%', height: '10%', border: '1px solid black', borderRadius: 5 }}
      />
      <div>
        <p>Time remaining: {formatTime(secondsLeft)}</p>
        <p>Inactive count: {inactiveCount}</p>
      </div>


    <div>
        <button onClick={signInWithFacebook}>Sign in with Facebook</button>


    </div>

    {userCount}

    </div>
  );
};

export default CameraCapture;
