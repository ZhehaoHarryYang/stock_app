export async function getBaseUrl() {
    const primaryUrl = process.env.REACT_APP_API_BASE_URL;
    const fallbackUrl = "http://localhost:80/api";
  
    try {
      // Attempt to reach the primary URL
      const response = await fetch(primaryUrl + '/ping', { method: 'HEAD' });
      
      // If the server responds, use the primary URL
      if (response.ok) {
        return primaryUrl;
      }
      
      throw new Error('Primary URL unreachable');
    } catch (error) {
      // If there's an error or the server is unreachable, use the fallback URL
      console.warn('Primary URL failed, switching to fallback URL:', error.message);
      return fallbackUrl;
    }
  }
  