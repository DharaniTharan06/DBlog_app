const config = {
    appwriteEndpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectid: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteBucketid: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteCollectionid: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteDatabaseid: String(import.meta.env.VITE_APPWRITE_DATABASE_ID)
}
export default config