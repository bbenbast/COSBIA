import axios from 'axios';

export const saveUserXp = async (xpAmount) => {
  try {
    // We use axios here because AuthContext sets the global default Authorization header
    // with the JWT token. 
    // Matching the localhost:5000 port from your AuthContext.
    const API_URL = 'http://localhost:5000/api/users/xp'; 

    const response = await axios.post(API_URL, { 
      xp: xpAmount,
      timestamp: new Date().toISOString() 
    });
    
    console.log(`Successfully saved ${xpAmount} XP to user account.`);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.warn("Server Error:", error.response.status, error.response.data);
    } else {
      console.warn("Failed to save XP to backend:", error.message);
    }
  }
};