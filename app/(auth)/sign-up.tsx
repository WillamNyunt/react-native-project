import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '@/constants'
import FormField from '@/components/FormField'
import { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'


const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full h-full justify-center px-4 my-6'>
          <Image source={images.logo} className='w-[115px] h-[35px]' resizeMode='contain' />
          <Text className='text-2xl text-white mt-10 font-psemibold'>Sign up to Aora</Text>
          <FormField title="Username" placeholder='Username' value={form.username} handleChangeText={(e: string) => setForm({ ...form, username: e })} otherStyles='mt-10' />
          <FormField title="Email" placeholder='Email' value={form.email} handleChangeText={(e: string) => setForm({ ...form, email: e })} otherStyles='mt-7' keyboardType="email-address" />
          <FormField title="Password" placeholder='Password' value={form.password} handleChangeText={(e: string) => setForm({ ...form, password: e })} otherStyles='mt-4' secureTextEntry />
          <CustomButton title="Sign In" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pre'>
              Have an account already?
            </Text>
            <Link href='/sign-in' className='text-secondary-200 text-lg font-psemibold'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp