import { View, Text, FlatList, Image, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import VideoCard from '@/components/VideoCard'
import useAppwrite from '@/lib/useAppwrite'

const Home = () => {
  const { data: posts, isLoading, refetch } = useAppwrite(getAllPosts)
  const { data: latestPosts, isLoading: latestPostsLoading, refetch: refetchLatestPosts } = useAppwrite(getLatestPosts)
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch();
    setRefreshing(false)
  }

  return (
    <SafeAreaView className='bg-primary h-full' edges={['right', 'left', 'top']}>
      <FlatList
        data={posts}
        className='h-full'
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard post={item} />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm- text-gray-100'>Welcome Back</Text>
                <Text className='text-2xl font-psemibold text-white'>William Nyunt</Text>
              </View>
              <View className='mt-1.5'>
                <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain' />
              </View>
            </View>
            <SearchInput placeholder='Search for a video topic' />
            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-lg font-pregular text-gray-100 mb-3'>Latest Videos</Text>
              <Trending posts={latestPosts ?? []} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(22, 22, 34)',
  },
});

export default Home