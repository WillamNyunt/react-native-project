import { ScrollView, Text, View, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../constants';

const App = () => {
  return (
    <SafeAreaView className='bg-primary max-h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full justify-center items-center h-full px-4'>
          <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain' />
          <Image source={images.cards} className='max-w-[380px] w-full h-[300px]' resizeMode="contain" />
          <View className="relative mt-5">
            <Text className='text-3xl text-white font-bold text-center'>Discover Endless Posibilities with {' '}     
             <Text className=' text-secondary-200'>Auora</Text>
             </Text>
             <Image
                source={images.path}
                resizeMode="contain"
                className="absolute w-[136px] h-[15px] -bottom-2 -right-8"
              />
          </View>
          <Text className='text-sm text-gray-200 mt-7 text-center font-pregular'>Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App

