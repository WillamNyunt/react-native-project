import { View, Text, Image } from 'react-native'
import React, { useRef , useCallback } from 'react'
import { Tabs } from 'expo-router'
import { ImageSourcePropType } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet';


type TabsLayoutProps = {
    children?: React.ReactNode,
    icon: ImageSourcePropType,
    color: string,
    name: string,
    focused: boolean
}

import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }: TabsLayoutProps) => {
    return (
        <View className='items-center justify-center gap-2'>
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-sm`} style={{ color: color }}>{name}</Text>
        </View>
    )
}

const TabsLayout = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <>
            <Tabs screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFA001',
                tabBarInactiveTintColor: '#CDCDE0',
                tabBarStyle: {
                    backgroundColor: '#161622',
                    borderTopWidth: 1,
                    borderTopColor: '#232533',
                    height: 84,
                }
            }}>
                <Tabs.Screen name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
                        )
                    }}
                />
                <Tabs.Screen name="bookmark"
                    options={{
                        title: 'Bookmark',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.bookmark} color={color} name="Bookmark" focused={focused} />
                        )
                    }}
                />
                <Tabs.Screen name="create"
                    options={{
                        title: 'Create',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.plus} color={color} name="Create" focused={focused} />
                        )
                    }}
                />
                <Tabs.Screen name="profile"
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabsLayout