import { View, Text, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Video as VideoType } from '@/types'
import { ResizeMode, Video, Audio } from "expo-av";
import * as Animatable from 'react-native-animatable'
import { icons } from '@/constants';
import { fetchVimeoUrl } from '@/lib/vimeo';


const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};



const TrendingItem = ({ activeItem, item }: { activeItem: any, item: any }) => {
  const [status, setStatus] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<Video>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchVimeoUrl(item.video)
      .then((videoUrl) => {
        setVideoUrl(videoUrl);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [])

  return (
    <Animatable.View className='mr-5' animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}>
      {isPlaying ? (
        <Video
          source={{
            uri: videoUrl ? videoUrl : '',
          }}
          ref={videoRef}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          shouldPlay={true}
          isLooping={false}
          useNativeControls={true}
          onPlaybackStatusUpdate={status => {if(status.didJustFinish) setIsPlaying(false)}}
        />
      ) : (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setIsPlaying(true)} className='relative justify-center items-center'>
          <ImageBackground source={{ uri: item.thumbnail }} className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40' resizeMode='cover' />
          <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}


const Trending = ({ posts }: { posts: VideoType[] }) => {
  const [activeItem, setActiveItem] = React.useState(posts[0])

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length == 0) return
    setActiveItem(viewableItems[0].key)
  }

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  )
}

export default Trending