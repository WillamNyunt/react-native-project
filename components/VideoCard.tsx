import { View, Text } from 'react-native'
import React from 'react'

const VideoCard = ({post} : {post : {title: string}}) => {
  return (
    <View>
      <Text>{post.title}</Text>
    </View>
  )
}

export default VideoCard