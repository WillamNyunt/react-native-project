import type { User } from './user'
export type Video = {
    $id: string,
    title: string,
    thumbnail: string,
    video: string,
    creator: User
}