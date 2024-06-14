import { createContext, useContext, useState, useEffect, ReactElement, ReactNode, Dispatch} from 'react'

type Data = {
    type: string;
    videoId: string;
}


type BottomSheetContextType = {
    bottomSheetRef: React.RefObject<any> | null;
    setBottomSheetRef: Dispatch<React.SetStateAction<Ref>>;
    open: () => void;
    close: () => void;
    snapTo: (index: number) => void;
    expand: () => void;
    collapse: () => void;
    setData: Dispatch<React.SetStateAction<Data>>;
    data: Data;
}

const BottomSheetContext = createContext<BottomSheetContextType>({
    bottomSheetRef: null,
    setBottomSheetRef: () => {},
    open: () => {},
    close: () => {},
    snapTo: (index: number) => {},
    expand: () => {},
    collapse: () => {},
    data: {
        type: '',
        videoId: '',
    },
    setData: () => {},
});

export const useBottomSheetContext = () => useContext(BottomSheetContext);


/** This context all the bottom sheet related functions and states. 
 *
 * @function setBottomSheetRef - Sets the bottom sheet ref required on bottomsheet component mount.
 * @function open - Opens the bottom sheet.
 * @function close - Closes the bottom sheet. 
 * @function snapTo - Snaps the bottom sheet to the given index.
 * @function expand - Expands the bottom sheet.
 * @param children
 * @returns 
 */

export const BottomSheetProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const [bottomSheetRef, setBottomSheetRef] = useState<any>(null);
    const [data, setData] = useState({ 
        type: '',
        videoId: '',
    });

    console.log(data)

    return (
        <BottomSheetContext.Provider value={{
            bottomSheetRef,
            setBottomSheetRef,
            open: () => bottomSheetRef?.expand(),
            close: () => bottomSheetRef?.close(),
            snapTo: (index: number) => bottomSheetRef?.snapTo(index),
            expand: () => bottomSheetRef?.expand(),
            collapse: () => bottomSheetRef?.collapse(),
            data: {
                type: data.type,
                videoId: data.videoId,
            },
            setData,
        }}>
            {children}
        </BottomSheetContext.Provider>
    )
}