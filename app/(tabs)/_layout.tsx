import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { ImageSourcePropType } from 'react-native'
import CustomBottomSheet from '@/components/CustomBottomSheet';

type TabsLayoutProps = {
    children?: React.ReactNode,
    icon: ImageSourcePropType,
    color: string,
    name: string,
    focused: boolean
    focusIcon: ImageSourcePropType,
}

import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused, focusIcon }: TabsLayoutProps) => {
    return (
        <View className='items-center justify-center gap-1'>
            <Image
                source={focused && focusIcon ? focusIcon : icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>{name}</Text>
        </View>
    )
}

const TabsLayout = () => {
    return (
        <>
            <Tabs screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: '#CDCDE0',
                tabBarInactiveTintColor: '#CDCDE0',
                tabBarStyle: {
                    backgroundColor: '#161622',
                    borderTopColor: "#232533",
                    borderTopWidth: 1,
                    height: 85, 
                    paddingBottom: 40,
                    paddingTop: 10
                }
            }}>
                <Tabs.Screen name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.home_transparent} color={color} name="Home" focused={focused} focusIcon={icons.home} />
                        )
                    }}
                />
                <Tabs.Screen name="bookmark"
                    options={{
                        title: 'Bookmark',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.bookmark_transparent} color={color} name="Bookmark" focused={focused} focusIcon={icons.bookmark} />
                        )
                    }}
                />
                <Tabs.Screen name="create"
                    options={{
                        title: 'Create',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.plus_transparent} color={color} name="Create" focused={focused} focusIcon={icons.plus} />
                        )
                    }}
                />
                <Tabs.Screen name="profile"
                    options={{
                        title: '',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.profile_transparent} color={color} name="Profile" focused={focused} focusIcon={icons.profile} />
                        )
                    }}
                />
            </Tabs>
            <CustomBottomSheet />
        </>
    )
}

export default TabsLayout