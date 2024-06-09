import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity, Image } from 'react-native'
import { icons } from '@/constants'
import { router, usePathname } from 'expo-router'


const SearchInput = ({initialQuery} : {initialQuery: string}) => {
    const pathanme = usePathname()
    const [query, setQuery] = useState(initialQuery || "");

    return (
        <View className='flex-row border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center space-x-4'>
            <TextInput className='text-base mt-0.5 text-white flex-1 font-pregular' value={query} placeholder='Search a video or topic' placeholderTextColor={'#CDCDE0'} onChangeText={(e) => setQuery(e)} />
            <TouchableOpacity onPress={() => {
                if (query === "") {
                    return Alert.alert('Missing query', 'Please input something to search results across database')
                }
                if (pathanme.startsWith('/search')) router.push(`/search/${query}`)
                else router.push(`/search/${query}`)    
            }}>
                <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput