import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { Video as VideoType } from '@/types'
import { fetchVimeoUrl } from '@/lib/vimeo'
import { icons } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import { useBottomSheetContext } from '@/context/BottomSheetProvider'


const VideoCard = ({ post: { $id, title, thumbnail, video, creator: { username, avatar } } }: { post: VideoType }) => {
    const [play, setPlay] = useState(false)
    const [videoUrl, setVideoUrl] = useState<string | null>(null)
    const { user } = useGlobalContext()
    const { open, setBookMarkData } = useBottomSheetContext()

    useEffect(() => { 
        fetchVimeoUrl(video)
            .then((videoUrl) => {
                setVideoUrl(videoUrl)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }, [])


    const openBottomSheet = () => {
        open()
        setBookMarkData({ type: 'bookmark', videoId: $id, userId: user?.id })
    }

    return (
        <View className='flex-col items-center px-4 mb-14'>
            <View className='flex-row gap-3 items-start'>
                <View className='justify-center items-center flex-row flex-1'>
                    <View className='w-[46px] h-[46px] rounded-lg border border-secondary-100 justify-center items-center p-0.5'>
                        <Image source={{ uri: avatar }} className='w-full h-full rounded-lg' resizeMode='cover' />
                    </View>
                    <View className='justify-center flex-1 ml-3 gap-y-1'>
                        <Text className='text-white font-psemibold text-sm' numberOfLines={1}>{title}</Text>
                        <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}>{username}</Text>
                    </View>
                </View>
                <View className='pt-2'>
                    <TouchableOpacity onPress={openBottomSheet}>
                        <Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
                    </TouchableOpacity>
                </View>
            </View>
            {play ? (
                <Video
                    source={{
                        uri: videoUrl ? videoUrl : '',
                    }}
                    className="w-full h-60 rounded-xl mt-3 bg-white/10"
                    resizeMode={ResizeMode.CONTAIN}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    shouldPlay={true}
                    isLooping={false}
                    useNativeControls={true}
                    onPlaybackStatusUpdate={status => { if (status.didJustFinish) setPlay(false) }}
                />
            ) : <TouchableOpacity activeOpacity={0.7} onPress={() => setPlay(true)} className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'>
                <Image source={{ uri: thumbnail }} className='w-full h-full rounded-xl mt-3' resizeMode='cover' />
                <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain' />
            </TouchableOpacity>}
        </View>
    )
}

export default VideoCard