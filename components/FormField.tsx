import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity, Image } from 'react-native'
import { icons } from '@/constants'

type FormFieldProps = {
    title: string,
    value: string,
    otherStyles?: string,
    handleChangeText: (e: string) => void,
    placeholder: string,
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad',
    secureTextEntry?: boolean
}


const FormField = ({ title, value, handleChangeText, otherStyles, keyboardType, secureTextEntry, placeholder, ...props }: FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-base text-gray-100 font-psemibold'>{title}</Text>
            <View className='flex-row border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center'>
                <TextInput className='flex-1 text-white font-psemibold text-base' value={value} placeholder={placeholder} placeholderTextColor={'#7b7b8b'} onChangeText={handleChangeText} secureTextEntry={title === 'Password' && !showPassword} />

                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}> 
                 <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain' />
                 </TouchableOpacity>
                )}

        </View>
        </View >
    )
}

export default FormField