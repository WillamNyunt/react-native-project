import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.brightnode.aora',
    projectId: '666429fa003636023e9e',
    databaseId: '66642b9c000c37052401',
    userCollectionId: '66642bb100165da2c800',
    videoCollectionId: '66642be0002155c255f0',
    storageId: '66642d6700056db78af9',
}

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

export const createUser = async (email : string, password : string, username : string) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);

        if (!newAccount) {
            throw new Error('Account not created');
        }

        const avatarUrl = avatars.getInitials(username);
        
        await signIn(email, password);

        const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
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