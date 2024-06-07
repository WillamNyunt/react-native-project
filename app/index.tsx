import { Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'

const App = () => {
  return (
    <View className="flex-1 items-center justify-center flex-col">
      <Text className="text-3xl  font-pblack">Frame</Text>
      <StatusBar style="auto" />
      <Link href="/home" className='t'>Go to Home</Link>
    </View>
  )
}

export default App

