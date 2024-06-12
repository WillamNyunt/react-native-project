import { View, Text } from 'react-native'
import React from 'react'
import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet'

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
  }) => {
    return <View className='bg-primary w-full min-h-[200px]' />;
  };

export default CustomBackground