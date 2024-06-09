import { View, Text, Alert } from 'react-native'
import React, {useEffect} from 'react'
import { Video } from '@/types'

const useAppwrite = (fn : () => Promise<any>) : {data : Video[], isLoading: boolean, refetch: () => void}  => {
    const [data, setData] = React.useState<Video[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await fn();
            if (response) {
                setData(response)
            } else {
                Alert.alert('Error', 'Error fetching videos')
            }
        } catch (error: any) {
            Alert.alert('Error', error.message)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => fetchData();

    return { data, isLoading, refetch }

}

export default useAppwrite