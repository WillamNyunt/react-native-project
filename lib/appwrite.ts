import { CreateForm } from '@/types';
import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';
import { Video } from '@/types';

// to do : toss this in a secret env file
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.brightnode.aora',
    projectId: '666429fa003636023e9e',
    databaseId: '66642b9c000c37052401',
    userCollectionId: '66642bb100165da2c800',
    videoCollectionId: '66642be0002155c255f0',
    storageId: '66642d6700056db78af9',
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = config;


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export async function createUser(email: string, password: string, username: string) {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);

        if (!newAccount) {
            throw new Error('Account not created');
        }

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(databaseId, userCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl,
        });

        return newUser;
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function signIn(email: string, password: string) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error as string);
    }
}

export async function getCurrentUser() {
    try {
        const currAccount = await account.get();
        if (!currAccount) {
            throw new Error('User not found');
        }
        const currUser = await databases.listDocuments(databaseId, userCollectionId, [Query.equal('accountId', currAccount.$id)]);
        if (!currUser) {
            throw new Error('User not found');
        }
        if (!currUser) throw Error;

        return currUser.documents[0];
    } catch (error) {
        throw new Error(error as string);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.orderDesc('$createdAt')]);
        if (!posts) {
            throw new Error('Posts not found');
        }
        return posts.documents;
    } catch (error) {
        throw new Error(error as string);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.orderDesc('$createdAt'), Query.limit(7)]);
        if (!posts) {
            throw new Error('Posts not found');
        }
        return posts.documents;
    } catch (error) {
        throw new Error(error as string);
    }
}

export const searchPosts = async (query: string) => {
    try {
        const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.search('title', query)]);
        if (!posts) {
            throw new Error('Posts not found');
        }
        return posts.documents;
    } catch (error) {
        console.log('error')
        throw new Error(error as string);
    }
}

export const getUserPosts = async (userId: string) => {
    try {
        const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.equal('creator', userId)]);
        if (!posts) {
            throw new Error('Posts not found')
        }
        return posts.documents;
    } catch (error) {
        console.log('error')
        throw new Error(error as string);
    }
}

export const signOut = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        throw new Error(error as string);
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl;
    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId);
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100);
        } else {
            throw new Error('Invalid file type')
        }

        if (!fileUrl) throw new Error('File URL not found');
        return fileUrl;
    } catch (error: any) {
        throw new Error(error);
    }
}


export const uploadFile = async (file, type: string) => {
    if (!file) throw new Error('File not found')
    const { mimeType, ...rest } = file;

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    }

    try {
        const uploadedFile = await storage.createFile(storageId, ID.unique(), asset);
        if (!uploadedFile) throw new Error('File not uploaded');
        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        throw new Error(error as string);
    }
}

export const createVideo = async (form: CreateForm) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ]);
        const newPost = await databases.createDocument(
            databaseId,
            videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                prompt: form.prompt,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                creator: form.userId,
            }
        )
        return newPost;
    } catch (error) {
        throw new Error(error as string);
    }
}

export const getBookmarkedVideos = async (videos: { videos: Video[] }): Promise<Video[]> => {
    try {
        const user = await getCurrentUser();
        const bookmarks = user['bookmarked-videos'];
        let bookMarkedVideos;
        try {
            bookMarkedVideos = await Promise.all(bookmarks.map(async (bookmark : string) => {
                const video = await databases.getDocument(databaseId, videoCollectionId, bookmark);
                return video;
            }
            ));
            return bookMarkedVideos;
        } catch (error) {
            throw new Error('Error fetching bookmarked videos');
        }  
    } catch (error) {
        throw new Error(error as string);
    }
}