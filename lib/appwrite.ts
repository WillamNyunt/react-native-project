import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

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
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email : string, password : string, username : string){
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

export async function signIn(email : string, password : string) {
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
        return currUser;
    } catch (error) {
        throw new Error(error as string);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(databaseId, videoCollectionId);
        if (!posts) {
            throw new Error('Posts not found');
        } 
        return posts.documents;
    } catch(error) {
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
    } catch(error) {
        throw new Error(error as string);
    }
}

export const searchPosts = async (query : string) => { 
    try {
        const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.search('title', query)]);
        if (!posts) {
            throw new Error('Posts not found');
        } 
        return posts.documents;
    } catch(error) {
        console.log('error')
        throw new Error(error as string);
    }
}

export const getUserPosts = async (userId: string) => { 
    try {
        const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.search('creator', userId)]);
        if (!posts) {
            throw new Error('Posts not found');
        } 
        return posts.documents;
    } catch(error) {
        console.log('error')
        throw new Error(error as string);
    }
}

