import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Trending = ({posts} : {posts : any[]}) => {
  return (
    <View>
        <Text>Trending</Text>
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Text className='text-3xl text-white'>{item.id}</Text>
            )}
        />
    </View>
  )
}

export default Trending