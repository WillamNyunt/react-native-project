import { createContext, useContext, useState, useEffect, ReactElement, ReactNode, Dispatch} from 'react'

type BottomSheetContextType = {
    bottomSheetRef: React.RefObject<any> | null;
    setBottomSheetRef: Dispatch<React.SetStateAction<Ref>>;
    open: () => void;
    close: () => void;
    snapTo: (index: number) => void;
    expand: () => void;
    collapse: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType>({
    bottomSheetRef: null,
    setBottomSheetRef: () => {},
    open: () => {},
    close: () => {},
    snapTo: (index: number) => {},
    expand: () => {},
    collapse: () => {},
});

export const useBottomSheetContext = () => useContext(BottomSheetContext);

export const BottomSheetProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [bottomSheetRef, setBottomSheetRef] = useState<any>(null);
    
    console.log(bottomSheetRef)
    return (
        <BottomSheetContext.Provider value={{
            bottomSheetRef,
            setBottomSheetRef,
            open: () => bottomSheetRef?.expand(),
            close: () => bottomSheetRef?.close(),
            snapTo: (index: number) => bottomSheetRef?.snapTo(index),
            expand: () => bottomSheetRef?.expand(),
            collapse: () => bottomSheetRef?.collapse(),
        }}>
            {children}
        </BottomSheetContext.Provider>
    )
}