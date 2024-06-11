import { DocumentPickerAsset } from 'expo-document-picker'

export type CreateForm = {
    title: string, 
    video: DocumentPickerAsset | null, 
    thumbnail: DocumentPickerAsset | null, 
    prompt: string
    userId: string,
}