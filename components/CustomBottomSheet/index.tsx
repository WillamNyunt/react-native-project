import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { useCallback } from 'react'
import { useMemo } from 'react'

import CustomBackground from './CustomBackground'
import CustomHandle from './CustomHandle'

const CustomBottomSheet = () => {
  const snapPoints = useMemo(() => ['25%', '50%', '70%'], [])
  
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
      />
    ),
    []
  );

  return (
    <BottomSheet snapPoints={snapPoints} backdropComponent={renderBackdrop} handleComponent={CustomHandle} backgroundComponent={CustomBackground}>
      <View className='h-full bg-primary' >
        <Text className='text-gray-100'>Bottom Sheet Content</Text>
      </View>
    </BottomSheet>
  )
}

export default CustomBottomSheet

const styles = StyleSheet.create({})