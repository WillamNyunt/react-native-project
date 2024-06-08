import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '@/constants'
import FormField from '@/components/FormField'
import { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { signIn } from '@/lib/appwrite'


const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password) {
      throw new Error('Please fill all fields');
    }
    setIsSubmitting(true);
    try {
      const response = await signIn(form.email, form.password);
      if (!response) {
        throw new Error('Cannot sign in');
      }
      router.push('/home');
    } catch (error : any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
        <ScrollView>
          <View className='w-full h-full justify-center px-4 my-6'>
            <Image source={images.logo} className='w-[115px] h-[35px]' resizeMode='contain' />
            <Text className='text-2xl text-white mt-10 font-psemibold'>Log in to Aora</Text>
            <FormField title="Email" placeholder='Email' value={form.email} handleChangeText={(e : string)=> setForm({...form, email: e})} otherStyles='mt-7' keyboardType="email-address" />
            <FormField title="Password" placeholder='Password' value={form.password} handleChangeText={(e : string)=> setForm({...form, password: e})} otherStyles='mt-4' secureTextEntry />
            <CustomButton title="Sign In" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />
            <View className='justify-center pt-5 flex-row gap-2'>
              <Text className='text-lg text-gray-100 font-pre'>
                Don't have an account?
              </Text>
              <Link href='/sign-up' className='text-secondary-200 text-lg font-psemibold'>Sign Up</Link>
            </View>
           </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn