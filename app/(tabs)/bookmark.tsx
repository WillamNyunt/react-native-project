import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import { EmptyState } from '@/components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { VideoCard } from '@/components'
import useAppwrite from '@/lib/useAppwrite'
import { getBookmarkedVideos } from '@/lib/appwrite'

const bookmark = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { data: posts , isLoading, refetch } = useAppwrite(getBookmarkedVideos)
  
  const onRefresh = async () => {
    setRefreshing(true)
    // refetch from appwrite
    setRefreshing(false)
  }
  return (
    <SafeAreaView className='bg-primary h-full' edges={['right', 'left', 'top']}>
      <FlatList
        data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <VideoCard post={item} />
      )}
      ListHeaderComponent={() => (
        <View className='my-6 px-4 space-y-6'>
          <View className='justify-between items-start flex-row mb-6'>
            <View>
              <Text className='text-2xl font-psemibold text-white'>Bookmarked Videos</Text>
            </View>
            <View className='mt-1.5'>
              <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain' />
            </View>
          </View>
          <SearchInput placeholder='Search for your bookmarked videos' />
          <View className='w-full flex-1 pt-5 pb-8'>
            <Text className='text-lg font-pregular text-gray-100 mb-3'>Latest Videos</Text>
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState title="No videos found" subtitle="Be the first one to upload a video" />
      )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default bookmark