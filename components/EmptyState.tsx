import { View, Text, Image } from 'react-native'
import { router } from 'expo-router'
import React from 'react'

import { images } from '@/constants'
import CustomButton from './CustomButton'


const EmptyState = ({title, subtitle} : {title: string, subtitle: string}) => {
  return (
    <View className='justify-center items-center px-4'>
      <Image source={images.empty} className='w-[270px] h-[215px]' resizeMode='contain' />
      <Text className='text-xl font-psemibold text-center text-white'>{title}</Text>
      <Text className='font-pmedium text-sm text-gray-100 mt-6'>{subtitle}</Text>
      <CustomButton containerStyles='w-full my-5' title='Upload Video' handlePress={() => router.push('/create')} />
    </View>
  )
}

export default EmptyState