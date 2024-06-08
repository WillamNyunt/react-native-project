import { View, Text } from 'react-native'
import React from 'react'
import { Video } from '@/types'

const VideoCard = ({post : {title, thumbnail, video, creator: {username, avatar}}} : {post: Video}) => {
    return (
        <View className='flex-col items-center px-4 mb-14'>
            <Text className='text-2xl text-white'>{title}</Text>
        </View>
    )
}

export default VideoCard