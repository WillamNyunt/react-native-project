import { createContext, useContext, useState, useEffect, ReactElement, ReactNode } from 'react'
import { getCurrentUser } from '@/lib/appwrite';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const GlobalContext = createContext({});
export const useGlobalContext = () => useContext(GlobalContext);


export const GlobalProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCurrentUser().then((res: any) => {
            if (res) {
                setIsLoggedIn(true)
                setUser(res)
            } else {
                setIsLoggedIn(false)
                setUser(null)
            }
        }).catch((error: any) => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, [])


    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            loading,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

