import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

function Test() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('usersdatatoken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, []);

  return (
    <div>
      {userId ? <p>User ID: {userId}</p> : <p>User not logged in</p>}
    </div>
  );
}

export default Test;
