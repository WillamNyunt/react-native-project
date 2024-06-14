import { createContext, useContext, useState, useEffect  } from 'react';
import { getBookmarkedVideos } from '@/lib/appwrite';

type VideoContext = {
    bookmarkedVideos: string[],
    setBookmarkedVideos: React.Dispatch<React.SetStateAction<string[]>>
    fetchBookmarkedVideos: () => void
}


const VideoContext = createContext<VideoContext>(
    {
        bookmarkedVideos: [],
        setBookmarkedVideos: () => {},
        fetchBookmarkedVideos: () => {}
    }
);

export const useVideoContext = () => useContext(VideoContext);

/**
 * Fetches bookmarked videos
 * @state bookmarkedVideos - Array of bookmarked video ids
 * @returns 
 */
export const VideoProvider = ({ children }: { children: React.ReactNode }) => {
    const [bookmarkedVideos, setBookmarkedVideos] = useState<string[]>([]);
    
    const fetchBookmarkedVideos = async () => {
        try {
            const bookmarkedVideos = await getBookmarkedVideos();
            const bookmarkedVideoIds = bookmarkedVideos.map((video: any) => video.$id) as string[];
            console.log('fetch bookmarked videos', bookmarkedVideoIds)
            setBookmarkedVideos(bookmarkedVideoIds);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBookmarkedVideos();
    }, []);

    return (
        <VideoContext.Provider value={{ bookmarkedVideos, setBookmarkedVideos, fetchBookmarkedVideos }}>
            {children}
        </VideoContext.Provider>
    );
};

export default VideoProvider;