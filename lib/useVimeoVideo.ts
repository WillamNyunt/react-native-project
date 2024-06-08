import React, {useEffect} from 'react'
  const useVimeoVideo = (url : string) => {
    const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const extractVimeoId = (url : string) => {
      const regex = /player\.vimeo\.com\/video\/(\d+)/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };


    useEffect(() => {
      const loadVideoUrl = async () => {
        const videoId = extractVimeoId(url);
        try {
          const response = await fetch(`https://player.vimeo.com/video/${videoId}/config`);
          if (!response.ok) {
            throw new Error('Failed to fetch Vimeo video URL');
          }
          const data = await response.json();
          const videoUrl = data.request.files.hls.cdns[Object.keys(data.request.files.hls.cdns)[0]].url;  
          setVideoUrl(videoUrl);
        } catch (error) {
          console.error('Error fetching Vimeo video URL:', error);
        } finally {
          setIsLoading(false);
        }
      };

      loadVideoUrl();
    }, []);

    return { videoUrl, isLoading }
  }
  
  export default useVimeoVideo