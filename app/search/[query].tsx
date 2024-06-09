import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Tabs, Redirect, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import VideoCard from '@/components/VideoCard'
import useAppwrite from '@/lib/useAppwrite'
import { searchPosts } from '@/lib/appwrite'

const Search = (initialQuery: string) => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));
  const [refreshing, setRefreshing] = React.useState(false)

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard post={item} />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <Text className='font-pmedium text-sm- text-gray-100'>Search results</Text>
            <Text className='text-2xl font-psemibold text-white'>{query}</Text>
            <View className='mt-6 mb-8'>
              <SearchInput initialQuery={query} refetch={refetch}  />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No videos found" subtitle="No videos found for this search query." />
        )}
      />
    </SafeAreaView>
  )
}

export default Search