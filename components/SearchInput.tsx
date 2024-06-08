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


const SearchInput = ({ title, value, handleChangeText, otherStyles, keyboardType, secureTextEntry, placeholder, ...props }: FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className='flex-row border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center space-x-4'>
            <TextInput className='åtext-base mt-0.5 text-white flex-1 font-pregular' value={value} placeholder={placeholder} placeholderTextColor={'#7b7b8b'} onChangeText={handleChangeText} secureTextEntry={title === 'Password' && !showPassword} />
            <TouchableOpacity>
                <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput