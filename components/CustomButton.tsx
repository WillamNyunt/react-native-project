import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

type CustomButtonProps = {
    title: string,
    handlePress: () => void,
    containerStyles?: string,
}



const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading} : CustomButtonProps) => {
  return (
    <View>
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`bg-secondary flex flex-row rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading? 'opacity-50' : ''}`}
            disabled={isLoading}>
            <Text className={`${textStyles} text-primary text-center w-full font-psemibold text-lg`}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CustomButton