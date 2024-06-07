import { ScrollView, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants';
import CustomButton from '@/components/CustomButton'
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';

const App = () => {
  return (
    <SafeAreaView className='bg-primary max-h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='w-full flex justify-center items-center min-h-[85vh] px-4'>
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
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles='mt-7 w-full'
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}

export default App

