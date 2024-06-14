// Function to extract the video ID from the Vimeo URL
const extractVimeoId = (url: string) => {
  const regex = /player\.vimeo\.com\/video\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Function to fetch video URL from Vimeo configuration

/** This function accepts a Vimeo URL and returns either video URL or input URL if it is not a vimeo URL.
 * 
 * @param url 
 * @returns  video URL
 */

export const fetchVimeoUrl = async (url: string) => {

  if (url.includes('vimeo')) {
    const videoId = extractVimeoId(url);
    if (!videoId) {
      throw new Error('Invalid Vimeo URL');
    }

    const configUrl = `https://player.vimeo.com/video/${videoId}/config`;

    try {
      const response = await fetch(configUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const videoUrl = data.request.files.hls.cdns[Object.keys(data.request.files.hls.cdns)[0]].url;
      return videoUrl;
    } catch (error) {
      console.error('Error fetching Vimeo video URL:', error);
      throw error;
    }
  } else {
    return url;
  }
};


