import axios from 'axios';

export const saveUserXp = async (xpAmount) => {
  try {
    const response = await axios.post('/api/users/xp', {
      xp: xpAmount,
      timestamp: new Date().toISOString()
    });

    console.log(`Successfully saved ${xpAmount} XP to user account.`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.warn('Server Error:', error.response.status, error.response.data);
    } else {
      console.warn('Failed to save XP to backend:', error.message);
    }
    return null;
  }
};