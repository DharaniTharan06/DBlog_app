import { meta } from "@eslint/js"

const config = {
    appwriteEndpoint: String(meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectid: String(meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteBucketid: String(meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteCollectionid: String(meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteDatabaseid: String(meta.env.VITE_APPWRITE_DATABASE_ID)
}

export default config