import { createContext, useContext, useState, useEffect, ReactElement, ReactNode, Dispatch} from 'react'
import { getCurrentUser } from '@/lib/appwrite';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

type GlobalContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: Dispatch<React.SetStateAction<boolean>>;
    user: any;
    setUser: Dispatch<React.SetStateAction<any>>;
    isLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    user: '',
    setUser : () => {},
    isLoading: true
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
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
            setIsLoading(false)
        })
    }, [])

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

