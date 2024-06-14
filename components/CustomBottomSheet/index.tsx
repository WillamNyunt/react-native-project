import { StyleSheet, Text, View } from 'react-native'
import React, {useRef, useEffect } from 'react'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { useBottomSheetContext } from '@/context/BottomSheetProvider'
import CustomBackground from './CustomBackground'
import CustomHandle from './CustomHandle'
import VideoCardBottomSheet from './VideoCardBottomSheet'

const CustomBottomSheet = () => {
  const snapPoints = useMemo(() => ['25%', '30%', '40%'], []);
  const { setBottomSheetRef, bookMarkData } = useBottomSheetContext();
  const bottomSheetRef = useRef<BottomSheet>(null);

  //* Stores the bottom sheet ref inside the context
  useEffect(() => {
    setBottomSheetRef(bottomSheetRef.current);
  }, [setBottomSheetRef]);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      handleComponent={CustomHandle}
      backgroundComponent={CustomBackground}
      index={-1}
      enablePanDownToClose
    >
      <View className='h-full bg-primary p-4'>
        { bookMarkData?.type === 'bookmark' && <VideoCardBottomSheet videoId={bookMarkData?.videoId} />}
      </View>
    </BottomSheet>
  );
};

export default CustomBottomSheet

const styles = StyleSheet.create({})