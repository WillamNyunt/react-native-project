import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useBottomSheetContext } from '@/context/BottomSheetProvider'
import { addVideoBookMark } from '@/lib/appwrite'

import { icons } from '@/constants'

const VideoCardBottomSheet = ({videoId} : {videoId: string}) => {
  const { close } = useBottomSheetContext()

  const handleAddBookmarkPress = async (videoId : string) => {
    try {
      await addVideoBookMark(videoId)
      close()
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <View className='w-full h-full flex flex-col'>
      <View className='flex flex-row justify-center w-full'>
        <TouchableOpacity className=' bg-gray-800 p-2 rounded-lg flex flex-col items-center flex-1 mr-2' onPress={() => handleAddBookmarkPress(videoId)}>
          <Image source={icons.bookmark} className='h-[30px] w-[30px]' resizeMode='contain' />
          <Text className='text-gray-200'>Bookmark</Text>
        </TouchableOpacity>
        <TouchableOpacity className=' bg-gray-800 p-2 rounded-lg flex flex-col items-center flex-1' onPress={() => console.log('Bookmark pressed')}>
          <Image source={icons.eyeHide} className='h-[30px] w-[30px]' resizeMode='contain' />
          <Text className='text-gray-200'>Hide</Text>
        </TouchableOpacity>
      </View>
      <View className='flex flex-col mt-2 w-full rounded-lg overflow-hidden'>
        <TouchableOpacity className='bg-gray-800 p-5'>
          <Text className='text-center text-gray-200'>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-gray-800 p-5 border border-t-stone-500 border-l-0 border-b-0 border-r-0'>
          <Text className='text-center text-red-500'>Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default VideoCardBottomSheet