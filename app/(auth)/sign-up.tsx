import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '@/constants'
import FormField from '@/components/FormField'
import { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields');
    }
    setIsSubmitting(true)
    try {
      const result = await createUser(form.email, form.password, form.username);
      if (!result) {
        throw new Error('Account not created');
      }
      setUser(response);
      setIsLoggedIn(true);
      router.push('/home')
     } catch (error : any) {
       Alert.alert('Error', error.message);
     } finally {
       setIsSubmitting(false)
     }
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
          <CustomButton title="Sign Up" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />
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